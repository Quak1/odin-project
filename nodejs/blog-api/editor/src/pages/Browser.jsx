import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import PostEntry from "../components/PostEntry";
import { deletePost, getUserPosts } from "../utils";

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

  return (
    <div>
      {!entries
        ? "Loading..."
        : !entries.length
          ? "You have no posts."
          : entries.map((entry) => (
              <PostEntry
                key={entry.id}
                entry={entry}
                onDelete={handleDelete(entry)}
              />
            ))}
    </div>
  );
};

export default Browser;
