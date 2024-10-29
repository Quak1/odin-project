const express = require("express");

const controller = require("../controllers/commentsController");
const { validateJWT } = require("../controllers/middleware");
const router = express.Router({ mergeParams: true });

router.post("/", validateJWT, controller.createComment);
router.get("/", controller.getPostComments);
router.delete("/:id", validateJWT, controller.deleteComment);

module.exports = router;
