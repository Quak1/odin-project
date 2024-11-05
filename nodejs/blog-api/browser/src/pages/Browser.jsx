import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BlogEntry from "../components/BlogEntry";

const Browser = () => {
  const { tag } = useParams();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const API = "http://localhost:3000";
    const url = tag ? `${API}/tags/${tag}/posts` : `${API}/posts`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setEntries(data.length ? data : null));
  }, [tag]);

  return (
    <div>
      {!entries
        ? "There are no posts for this tag."
        : !entries.length
          ? "Loading..."
          : entries.map((entry) => <BlogEntry key={entry.id} entry={entry} />)}
    </div>
  );
};

export default Browser;
