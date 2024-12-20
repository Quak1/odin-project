import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BlogEntry from "../components/BlogEntry";
import { API_URL } from "../config/constant";

const Browser = () => {
  const { tag } = useParams();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const url = tag ? `${API_URL}/tags/${tag}/posts` : `${API_URL}/posts`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setEntries(data.length ? data : null));
  }, [tag]);

  return (
    <div>
      {tag && <h1>Posts by tag: {tag}</h1>}
      {!entries
        ? "There are no posts for this tag."
        : !entries.length
          ? "Loading..."
          : entries.map((entry) => <BlogEntry key={entry.id} entry={entry} />)}
    </div>
  );
};

export default Browser;
