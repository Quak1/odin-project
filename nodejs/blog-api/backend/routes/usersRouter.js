const express = require("express");

const controller = require("../controllers/usersController");
const { authorized, login } = require("../controllers/auth");
const router = express.Router();

router.post("/", controller.createUser);
router.get("/", controller.getAllUsers);
router.post("/login", login);
router.get("/:id", controller.getUserById);
router.get("/:id/posts", authorized, controller.getUserPosts);
router.get("/:id/posts/public", controller.getUserPostsPublic);
router.put("/:id/username", authorized, controller.updateUsername);
router.put("/:id/password", authorized, controller.updatePassword);
router.delete("/:id", authorized, controller.deleteUser);

module.exports = router;
