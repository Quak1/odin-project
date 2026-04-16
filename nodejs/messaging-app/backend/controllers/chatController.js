const { matchedData } = require("express-validator");
const queries = require("../prisma/queries");

const getChatMessages = async (req, res) => {
  const { chatId } = matchedData(req);

  const messages = await queries.getChatMessages(req.user.id, chatId);
  console.log("message", messages);
  res.status(200).json(messages);
};

const sendMessage = async (req, res) => {
  const { chatId, message } = matchedData(req);
  const userId = req.user.id;

  const members = await queries.getChatMembers(chatId);
  console.log("memebers", members);
  if (!(userId in members)) return res.sendStatus(403);

  const newMessage = await queries.createMessage(userId, chatId, message);
  console.log("newMessage", newMessage);
  res.status(201);
};

const createChat = async (req, res) => {
  const { partnerId } = matchedData(req);
  const userId = req.user.id;

  console.log({ partnerId, userId }, matchedData(req));
  const chat = await queries.getDirectChat(userId, partnerId);
  console.log("chat", chat[0]);
  if (chat.length) return res.status(200).json(chat[0].id);

  const newChat = await queries.createChat(userId, partnerId);
  console.log("newChat", newChat);
  res.status(201).json(chat.id);
};

const acceptChat = async (req, res) => {
  const { chatId } = matchedData(req);
};

const rejectChat = async (req, res) => {
  const { chatId } = matchedData(req);

  const chat = await queries.removePendingChatMember(req.user.id, chatId);
  console.log("chat", chat);
  res.sendStatus(200);
};

module.exports = {
  createChat,
  sendMessage,
  getChatMessages,
  acceptChat,
  rejectChat,
};
