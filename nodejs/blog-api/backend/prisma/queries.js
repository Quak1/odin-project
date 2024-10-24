const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
};
