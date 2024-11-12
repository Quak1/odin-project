import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

import PostEntry from "../components/PostEntry";
import { deletePost, getUserPosts, togglePostPublication } from "../utils";

const Browser = () => {
  const [entries, setEntries] = useState(null);
  const navigate = useNavigate();
  const { user } = useOutletContext();

  useEffect(() => {
    if (!user) navigate("/login");
    else getUserPosts(user).then((data) => setEntries(data ? data : null));
  }, [user, navigate]);

  const handleDelete = (entry) => async () => {
    const msg = `Are you sure you want to delete post with title: "${entry.title}"?`;
    if (!confirm(msg)) return;

    const res = await deletePost(entry.id, user);
    if (!res.ok) return alert("There was an error deleting this post");

    setEntries(entries.filter((e) => entry.id !== e.id));
  };

  const handleTogglePublication = (entry) => async () => {
    const prefix = entry.published ? "un" : "";
    const msg = `Are you sure you want to ${prefix}publish post with title: "${entry.title}"?`;
    if (!confirm(msg)) return;

    const res = await togglePostPublication(entry.id, user);
    if (!res.ok)
      return alert(`There was an error ${prefix}publishing this post`);

    const newEntries = entries.map((oldEntry) =>
      oldEntry.id !== entry.id
        ? oldEntry
        : { ...oldEntry, published: !oldEntry.published },
    );
    setEntries(newEntries);
  };

  return (
    <div>
      <Link to="/new">New post!</Link>
      {!entries
        ? "Loading..."
        : !entries.length
          ? "You have no posts."
          : entries.map((entry) => (
              <PostEntry
                key={entry.id}
                entry={entry}
                onDelete={handleDelete(entry)}
                handleTogglePublication={handleTogglePublication(entry)}
              />
            ))}
    </div>
  );
};

export default Browser;
