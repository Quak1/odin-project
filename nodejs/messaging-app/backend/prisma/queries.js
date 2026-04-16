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

const createChat = async (senderId, partnerId) => {
  return await prisma.chat.create({
    data: {
      members: { connect: { id: senderId } },
      pendingMembers: { connect: { id: partnerId } },
    },
  });
};

const getDirectChat = async (senderId, partnerId) => {
  return await prisma.chat.findMany({
    where: {
      members: { every: { id: { in: [senderId, partnerId] } } },
      isGroup: false,
    },
    select: {
      id: true,
      members: { select: { id: true } },
    },
  });
};

const getChatMembers = async (chatId) => {
  return await prisma.chat.findUnique({
    where: { id: chatId },
    select: { members: true },
  });
};

const createMessage = async (userId, chatId, message) => {
  return await prisma.message.create({
    data: {
      sender: { connect: { id: userId } },
      chat: { connect: { id: chatId } },
      content: message,
    },
  });
};

const getChatMessages = async (userId, chatId) => {
  return await prisma.message.findMany({
    where: {
      chat: {
        id: chatId,
        members: { some: { id: userId } },
      },
    },
  });
};

const addChatMember = async (userId, chatId) => {
  return await prisma.chat.update({
    where: { id: chatId },
    data: { members: { connect: { id: userId } } },
  });
};

const removeChatMember = async (userId, chatId) => {
  return await prisma.chat.update({
    where: { id: chatId },
    data: { members: { disconnect: { id: userId } } },
  });
};

const addPendingChatMember = async (userId, chatId) => {
  return await prisma.chat.update({
    where: { id: chatId },
    data: { pendingMembers: { connect: { id: userId } } },
  });
};

const removePendingChatMember = async (userId, chatId) => {
  return await prisma.chat.update({
    where: { id: chatId },
    data: { pendingMembers: { disconnect: { id: userId } } },
  });
};

module.exports = {
  createUser,
  getUsernameId,
  createMessage,
  getChatMessages,
  createChat,
  getDirectChat,
  getChatMembers,
  addChatMember,
  removeChatMember,
  addPendingChatMember,
  removePendingChatMember,
};
