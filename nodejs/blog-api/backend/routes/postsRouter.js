const express = require("express");

const controller = require("../controllers/postsController");
const { validateJWT } = require("../controllers/middleware");
const commentsRouter = require("./commentsRouter");
const router = express.Router();

router.post("/", validateJWT, controller.createPost);
router.get("/", controller.getAllPosts);
router.get("/:id", validateJWT, controller.getPostById);
router.get("/:id/public", controller.getPublishedPost);
router.put("/:id", validateJWT, controller.updatePost);
router.delete("/:id", validateJWT, controller.deletePost);
router.use("/:id/comments", commentsRouter);

module.exports = router;
