const asyncHandler = require("express-async-handler");

const { commentValidator, handleValidationErrors } = require("./validators");
const queries = require("../prisma/queries");

const createComment = [
  commentValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const content = req.body.content;
    const comment = await queries.postComment(postId, userId, content);
    res.json(comment);
  }),
];

const getPostComments = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const comments = await queries.getPostComments(postId);
  res.json(comments);
});

const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const comment = await queries.getCommentById(commentId);

  if (!comment) return res.sendStatus(204);
  if (userId !== comment.userId && userId !== comment.post.userId)
    return res.sendStatus(401); //TODO unauth error

  await queries.deleteComment(commentId);
  res.sendStatus(204);
});

module.exports = {
  createComment,
  getPostComments,
  deleteComment,
};
