import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Comment from "../components/Comment";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const url = `http://localhost:3000/posts/${postId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => setPost(data));
  }, [postId]);

  return post ? (
    <div>
      <main>
        <img src={post.headerPicture} alt="" />
        <h1>{post.title}</h1>
        <p>
          by <Link to={post.user.id}>{post.user.username}</Link> • published{" "}
          {post.createdAt}
        </p>
        <div>{post.content}</div>
      </main>
      <div>
        <h2>Comments ({post.comments.length})</h2>
        <div>
          {post.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  ) : (
    "Loading..."
  );
};

export default Post;
