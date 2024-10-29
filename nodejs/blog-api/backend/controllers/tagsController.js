const asyncHandler = require("express-async-handler");

const queries = require("../prisma/queries");

const getTags = asyncHandler(async (req, res) => {
  const tags = await queries.getTags();
  res.json(tags);
});

const getPostsByTag = asyncHandler(async (req, res) => {
  const { tag } = req.params;
  const posts = await queries.getPostsByTag(tag);
  res.json(posts);
});

module.exports = {
  getTags,
  getPostsByTag,
};
