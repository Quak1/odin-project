const asyncHandler = require("express-async-handler");

const { commentValidator, handleValidationErrors } = require("./validators");
const { NotFoundError, UnauthorizedError } = require("../errors");
const queries = require("../prisma/queries");
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");

const createComment = [
  commentValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const content = req.body.content;
    try {
      const comment = await queries.postComment(postId, userId, content);
      res.json(comment);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundError("Post or user not found");
      else throw error;
    }
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
    throw new UnauthorizedError();

  await queries.deleteComment(commentId);
  res.sendStatus(204);
});

module.exports = {
  createComment,
  getPostComments,
  deleteComment,
};
