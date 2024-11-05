import { useState, useEffect } from "react";

import Header from "../components/Header";
import BlogEntry from "../components/BlogEntry";

const Browser = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  return (
    <div>
      <Header />
      {entries.map((entry) => (
        <BlogEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Browser;
