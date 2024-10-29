const express = require("express");

const controller = require("../controllers/postsController");
const { validJWT } = require("../controllers/auth");
const router = express.Router();

router.post("/", validJWT, controller.createPost);
router.get("/", controller.getAllPosts);
router.get("/:id", validJWT, controller.getPostById);
router.get("/:id/public", controller.getPublishedPost);
router.put("/:id", validJWT, controller.updatePost);
router.delete("/:id", validJWT, controller.deletePost);

module.exports = router;
