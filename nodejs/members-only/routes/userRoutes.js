const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");

router.get("/signup", controller.signupGet);
router.post("/signup", controller.signupPost);

router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);

router.post("/logout", controller.logoutPost);

module.exports = router;
