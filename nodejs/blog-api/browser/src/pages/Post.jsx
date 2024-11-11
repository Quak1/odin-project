import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

import CommentSection from "../components/CommentSection";
import { API_URL } from "../config/constant";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const createdAt = dayjs(post?.createdAt).format("dddd, MMMM D, YYYY h:mm A");
  const updatedAt = dayjs(post?.updatedAt).format("YYYY-MM-DD");

  useEffect(() => {
    const url = `${API_URL}/posts/${postId}`;
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
          {createdAt}
        </p>
        <div>{post.content}</div>
      </main>
      <CommentSection
        comments={post.comments}
        postId={post.id}
        ownerId={post.user.id}
      />
    </div>
  ) : (
    "Loading..."
  );
};

export default Post;
