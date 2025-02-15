const { Router } = require("express");
const controller = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", controller.usernamesGet);
usersRouter.get("/new", controller.usersNewGet);
usersRouter.post("/new", controller.usersNewPost);
usersRouter.get("/delete", controller.deleteUsernamesGet);

module.exports = usersRouter;
