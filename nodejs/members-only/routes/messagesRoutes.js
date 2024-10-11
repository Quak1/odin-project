const express = require("express");
const router = express.Router();

const controller = require("../controllers/messagesController");
const { isAuth } = require("./isAuth");

router.get("/", controller.allMessagesGet);
router.get("/message", isAuth, controller.createMessateGet);
router.post("/message", isAuth, controller.createMessatePost);
router.post("/message/:id/delete", isAuth, controller.deleteMessage);

module.exports = router;
