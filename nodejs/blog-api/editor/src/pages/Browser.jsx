import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import PostEntry from "../components/PostEntry";
import { getUserPosts } from "../utils";

const Browser = () => {
  const [entries, setEntries] = useState(null);
  const navigate = useNavigate();
  const { user } = useOutletContext();

  useEffect(() => {
    if (!user) navigate("/login");
    else
      getUserPosts(user).then((data) => setEntries(data?.length ? data : null));
  }, [user, navigate]);

  return (
    <div>
      {!entries
        ? "Loading..."
        : !entries.length
          ? "You have no posts."
          : entries.map((entry) => <PostEntry key={entry.id} entry={entry} />)}
    </div>
  );
};

export default Browser;
