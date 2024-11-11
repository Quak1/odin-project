import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";

import { API_URL } from "../config/constant";
import styled from "styled-components";

const CommentContainer = styled.div`
  border: 1px solid ${(p) => p.theme.gray};
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px 15px;

  p {
    margin: 0;
  }
  p:first-child {
    color: ${(p) => p.theme.main};
    font-weight: bold;
    font-size: 14px;
  }
  p:nth-child(2) {
    font-size: 16px;
    color: black;
  }
`;

const DeleteButton = styled.button`
  text-decoration: underline;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const Comment = ({ ownerId, removeComment, comment }) => {
  const { user } = useOutletContext();
  const createdAt = dayjs(comment.createdAt).format("MMM D YYYY");

  const deleteComment = async () => {
    const url = `${API_URL}/posts/${comment.postId}/comments/${comment.id}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) removeComment(comment.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CommentContainer>
      <p>
        {comment.user.username} • <span>{createdAt}</span>
        {user && (user.id === comment.user.id || user.id === ownerId) && (
          <>
            {" "}
            • <DeleteButton onClick={deleteComment}>Delete</DeleteButton>
          </>
        )}
      </p>
      <p>{comment.content}</p>
    </CommentContainer>
  );
};

Comment.propTypes = {
  ownerId: PropTypes.string,
  removeComment: PropTypes.func,
  comment: PropTypes.exact({
    id: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    postId: PropTypes.string,
    user: PropTypes.exact({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  }),
};

export default Comment;
