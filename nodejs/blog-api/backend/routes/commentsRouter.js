const express = require("express");

const controller = require("../controllers/commentsController");
const { validJWT } = require("../controllers/auth");
const router = express.Router({ mergeParams: true });

router.post("/", validJWT, controller.createComment);
router.get("/", controller.getPostComments);
router.delete("/:id", validJWT, controller.deleteComment);

module.exports = router;
