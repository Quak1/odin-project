const express = require("express");

const controller = require("../controllers/postsController");
const { validateJWT, validateJwtOrNext } = require("../controllers/middleware");
const commentsRouter = require("./commentsRouter");
const router = express.Router();

router.post("/", validateJWT, controller.createPost);
router.get("/", controller.getAllPosts);
router.get("/:id", validateJwtOrNext, controller.getPostById);
router.put("/:id", validateJWT, controller.updatePost);
router.delete("/:id", validateJWT, controller.deletePost);
router.patch(
  "/:id/togglePublication",
  validateJWT,
  controller.togglePostPublication,
);
router.use("/:id/comments", commentsRouter);

module.exports = router;
