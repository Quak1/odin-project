const { PrismaClient } = require("@prisma/client");
const { name, pass } = require("../config/jwtStrategy");
const prisma = new PrismaClient();

// users
async function createUser(username, password) {
  return await prisma.user.create({ data: { username, password } });
}

async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      _count: { select: { posts: true } },
    },
  });
}

async function getUserByUsername(username) {
  return await prisma.user.findUnique({ where: { username } });
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id: id },
    omit: { password: true },
  });
}

async function getUserPosts(id) {
  return await prisma.post.findMany({
    where: { userId: id },
    omit: { content: true },
    include: { tags: true, _count: { select: { comments: true } } },
  });
}

async function getUserPublicPosts(id) {
  return await prisma.post.findMany({
    where: { userId: id, published: true },
    omit: { content: true },
    include: { tags: true, _count: { select: { comments: true } } },
  });
}

async function updateUserUsername(id, username) {
  return await prisma.user.update({
    where: { id },
    data: { username },
  });
}

async function updateUserPassword(id, password) {
  return await prisma.user.update({
    where: { id },
    data: { password },
  });
}

async function deleteUserById(id) {
  return await prisma.user.delete({
    where: { id },
  });
}

// POSTS
const connectTags = (name) => ({ where: { name }, create: { name } });
async function createPost(userId, post) {
  return await prisma.post.create({
    data: {
      ...post,
      user: { connect: { id: userId } },
      tags: {
        connectOrCreate: post.tags.map(connectTags),
      },
    },
  });
}

async function getAllPublishedPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    omit: { content: true, published: true, userId: true },
    include: {
      tags: true,
      _count: { select: { comments: true } },
      user: { select: { id: true, username: true } },
    },
  });
}

async function getPostById(id) {
  return await prisma.post.findUnique({
    where: { id },
    omit: { userId: true },
    include: {
      tags: true,
      comments: {
        omit: { userId: true },
        include: { user: { select: { id: true, username: true } } },
      },
      user: { select: { id: true, username: true } },
    },
  });
}

async function updatePost(id, post) {
  return await prisma.post.update({
    where: { id },
    data: {
      ...post,
      tags: {
        set: [],
        connectOrCreate: post.tags.map(connectTags),
      },
    },
  });
}

async function togglePostPublication(id, isPublished) {
  return await prisma.post.update({
    where: { id },
    data: { published: !isPublished },
  });
}

async function deletePost(id) {
  return await prisma.post.delete({
    where: { id },
  });
}

// COMMENTS
async function postComment(postId, userId, content) {
  return await prisma.comment.create({
    data: {
      user: { connect: { id: userId } },
      post: { connect: { id: postId } },
      content,
    },
    omit: { userId },
    include: { user: { omit: { password: true } } },
  });
}

async function getPostComments(postId) {
  return await prisma.comment.findMany({
    where: { postId },
  });
}

async function getCommentById(id) {
  return await prisma.comment.findUnique({
    where: { id },
    include: { post: { select: { userId: true } } },
  });
}

async function deleteComment(id) {
  return await prisma.comment.delete({
    where: { id },
  });
}

// TAGS
async function getTags() {
  return await prisma.tag.findMany();
}

async function getPostsByTag(tag) {
  return await prisma.post.findMany({
    where: { published: true, tags: { some: { name: tag } } },
    omit: { content: true, published: true, userId: true },
    include: {
      tags: true,
      _count: { select: { comments: true } },
      user: { select: { id: true, username: true } },
    },
  });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  getUserPosts,
  getUserPublicPosts,
  updateUserUsername,
  updateUserPassword,
  deleteUserById,
  createPost,
  getAllPublishedPosts,
  getPostById,
  updatePost,
  deletePost,
  togglePostPublication,
  postComment,
  getPostComments,
  getCommentById,
  deleteComment,
  getTags,
  getPostsByTag,
};
