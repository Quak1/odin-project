const { Router } = require("express");
const controller = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", controller.usernamesGet);
usersRouter.get("/new", controller.usersNewGet);
usersRouter.post("/new", controller.usersNewPost);

module.exports = usersRouter;
