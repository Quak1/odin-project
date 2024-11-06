import PropTypes from "prop-types";

const Comment = ({ comment }) => {
  return (
    <div>
      <p>{comment.user.username}</p>
      <p>{comment.content}</p>
    </div>
  );
};

Comment.propTypes = {
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
