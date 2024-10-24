const express = require("express");

const controller = require("../controllers/usersController");
const router = express.Router();

router.post("/", controller.createUser);

module.exports = router;
