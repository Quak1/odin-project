const express = require("express");

const controller = require("../controllers/usersController");
const router = express.Router();

router.post("/", controller.createUser);
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.get("/:id/posts", controller.getUserPosts);
router.get("/:id/posts/public", controller.getUserPostsPublic);
router.put("/:id/username", controller.updateUsername);
router.put("/:id/password", controller.updatePassword);
router.delete("/:id", controller.deleteUser);

module.exports = router;
