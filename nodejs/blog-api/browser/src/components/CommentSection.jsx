import PropTypes from "prop-types";

import Comment from "./Comment";
import CommentBox from "./CommentBox";
import { useState } from "react";

const CommentSection = ({ postId, comments: postComments }) => {
  const [comments, setComments] = useState(postComments);

  const addComment = (comment) => setComments([comment, ...comments]);

  return (
    <div>
      <h2>Comments s({comments.length})</h2>
      <CommentBox postId={postId} addComment={addComment} />
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
      postId: PropTypes.string,
      user: PropTypes.exact({
        id: PropTypes.string,
        username: PropTypes.string,
      }),
    }),
  ),
};

export default CommentSection;
