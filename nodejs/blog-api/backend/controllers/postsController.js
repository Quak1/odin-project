const asyncHandler = require("express-async-handler");

const { postValidator, handleValidationErrors } = require("./validators");
const queries = require("../prisma/queries");

const createPost = [
  postValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    // TODO auto create tags
    const post = await queries.createPost(req.user.id, req.body);
    res.json(post);
  }),
];

const getAllPosts = asyncHandler(async (req, res) => {
  // TODO pagination
  const posts = await queries.getAllPublishedPosts();
  res.json(posts);
});

const getPostById = asyncHandler(async (req, res) => {
  const post = await queries.getPostById(req.params.id);

  if (!post) return res.sendStatus(404);
  if (post.userId !== req.user.id)
    // TODO unauthorized
    return res.sendStatus(404);

  res.json(post);
});

const getPublishedPost = asyncHandler(async (req, res) => {
  const post = await queries.getPostById(req.params.id);

  if (!post) return res.sendStatus(404);
  if (post.published === false)
    // TODO unauthorized
    return res.sendStatus(404);

  res.json(post);
});

const updatePost = [
  postValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const post = await queries.getPostById(postId);

    if (!post) return res.sendStatus(404); // TODO not found
    if (userId !== post.userId) return res.sendStatus(403); // TODO unauthorized error

    const updated = await queries.updatePost(postId, req.body);
    res.json(updated);
  }),
];

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const post = await queries.getPostById(postId);

  if (!post) return res.sendStatus(404); // TODO not found
  if (userId !== post.userId) return res.sendStatus(403); // TODO unauthorized error

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
