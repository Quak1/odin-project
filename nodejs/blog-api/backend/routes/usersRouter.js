const express = require("express");

const controller = require("../controllers/usersController");
const { login } = require("../controllers/authController");
const { validateJWT } = require("../controllers/middleware");
const { UnauthorizedError } = require("../errors");
const router = express.Router();

const authorized = [
  validateJWT,
  (req, res, next) => {
    if (req.params.id !== req.user.id) throw new UnauthorizedError();
    else next();
  },
];

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
