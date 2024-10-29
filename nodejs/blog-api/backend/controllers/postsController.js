const asyncHandler = require("express-async-handler");

const { UnauthorizedError, NotFoundError } = require("../errors");
const { postValidator, handleValidationErrors } = require("./validators");
const queries = require("../prisma/queries");

const createPost = [
  postValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const post = await queries.createPost(req.user.id, req.body);
    res.json(post);
  }),
];

const getAllPosts = asyncHandler(async (req, res) => {
  // TODO pagination and filter
  const posts = await queries.getAllPublishedPosts();
  res.json(posts);
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await queries.getPostById(req.params.id);

  if (!post) throw new NotFoundError();
  if (post.userId !== req.user.id) throw new UnauthorizedError();

  res.json(post);
});

const getPublishedPost = asyncHandler(async (req, res) => {
  const post = await queries.getPostById(req.params.id);

  if (!post || !post.published) throw new NotFoundError();

  res.json(post);
});

const updatePost = [
  postValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await queries.getPostById(postId);

    if (!post) throw new NotFoundError();
    if (userId !== post.userId) throw new UnauthorizedError();

    const updated = await queries.updatePost(postId, req.body);
    res.json(updated);
  }),
];

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const post = await queries.getPostById(postId);

  if (!post) return res.sendStatus(204);
  if (userId !== post.userId) throw new UnauthorizedError();

  await queries.deletePost(postId);
  res.sendStatus(204);
});

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPublishedPost,
  updatePost,
  deletePost,
};
