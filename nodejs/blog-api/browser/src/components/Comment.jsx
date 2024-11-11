import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";

import { API_URL } from "../config/constant";

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
    <div>
      <p>
        {comment.user.username} • <span>{createdAt}</span>
        {user && (user.id === comment.user.id || user.id === ownerId) && (
          <>
            {" "}
            • <button onClick={deleteComment}>Delete</button>
          </>
        )}
      </p>
      <p>{comment.content}</p>
    </div>
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
