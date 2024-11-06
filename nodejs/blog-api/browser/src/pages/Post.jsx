import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CommentSection from "../components/CommentSection";

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
      <CommentSection comments={post.comments} postId={post.id} />
    </div>
  ) : (
    "Loading..."
  );
};

export default Post;
