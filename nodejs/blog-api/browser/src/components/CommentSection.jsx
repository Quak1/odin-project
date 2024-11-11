import PropTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";

import Comment from "./Comment";
import CommentBox from "./CommentBox";

const Container = styled.div`
  h2 {
    margin-bottom: 0;
  }
`;

const CommentSection = ({ postId, ownerId, comments: postComments }) => {
  const [comments, setComments] = useState(postComments);

  const addComment = (comment) => setComments([comment, ...comments]);
  const removeComment = (commentId) => {
    setComments(comments.filter((comment) => commentId !== comment.id));
  };

  return (
    <Container>
      <h2>Comments ({comments.length})</h2>
      <CommentBox postId={postId} addComment={addComment} />
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            ownerId={ownerId}
            removeComment={removeComment}
          />
        ))}
      </div>
    </Container>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string,
  ownerId: PropTypes.string,
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
