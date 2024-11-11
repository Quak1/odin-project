import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

import CommentSection from "../components/CommentSection";
import { API_URL } from "../config/constant";
import styled from "styled-components";
import Tags from "../components/Tags";

const PostContainer = styled.main`
  h1 {
    font-size: 48px;
    margin: 0;
    color: ${(props) => props.theme.main};
  }
`;

const PostInfo = styled.p`
  font-size: 14px;
  color: #6f6f6f;
  margin-top: 0;
  margin-bottom: 10px;
  a {
    text-decoration: none;
  }
`;

const Content = styled.div`
  font-size: 18px;
  padding: 10px 5px;
  border-bottom: 1px solid #c4c4c4;
`;

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const createdAt = dayjs(post?.createdAt).format("dddd, MMMM D, YYYY h:mm A");
  const updatedAt = dayjs(post?.updatedAt).format("YYYY-MM-DD");
  if (!post.headerPicture) post.headerPicture = "https://placehold.co/800x500";

  useEffect(() => {
    const url = `${API_URL}/posts/${postId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => setPost(data));
  }, [postId]);

  return post.title ? (
    <div>
      <PostContainer>
        <img src={post.headerPicture} alt="" />
        <h1>{post.title}</h1>
        <PostInfo>
          <span>
            by <Link to={post.user.id}>{post.user.username}</Link>
          </span>
          <span> • published {createdAt}</span>
          {post.tags.length && (
            <>
              <span> • Tags: </span>
              <span>
                <Tags tags={post.tags} />
              </span>
            </>
          )}
        </PostInfo>
        <Content>{post.content}</Content>
      </PostContainer>
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
