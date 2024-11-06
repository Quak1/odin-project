import PropTypes from "prop-types";

import Comment from "./Comment";
import CommentBox from "./CommentBox";

const CommentSection = ({ postId, comments }) => {
  console.log({ comments });

  return (
    <div>
      <h2>Comments s({comments.length})</h2>
      <CommentBox postId={postId} />
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      user: PropTypes.exact({
        id: PropTypes.string,
        username: PropTypes.string,
      }),
    }),
  ),
};

export default CommentSection;
