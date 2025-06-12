const prisma = require("./client");

const createUser = async (username, password) => {
  return await prisma.user.create({
    data: { username, password },
  });
};

const getUsernameId = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });
};

module.exports = {
  createUser,
  getUsernameId,
};
