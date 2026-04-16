const express = require("express");
const router = express.Router();

const controller = require("../controllers/chatController");
const {
  fieldValidator,
  handleValidationErrors,
} = require("../middleware/validators");

const validateChatId = [
  fieldValidator("chatId", "param"),
  handleValidationErrors,
];

router.post(
  "/new",
  fieldValidator("partnerId"),
  handleValidationErrors,
  controller.createChat,
);
router.post("/:chatId", validateChatId, controller.sendMessage);
router.get("/:chatId", validateChatId, controller.getChatMessages);
router.post("/:chatId/accept", validateChatId, controller.acceptChat);
router.post("/:chatId/reject", validateChatId, controller.rejectChat);

module.exports = router;
