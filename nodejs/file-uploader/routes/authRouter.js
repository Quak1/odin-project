const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");
const { ensureNotAuth } = require("./isAuth");

router.get("/logout", controller.logoutGet);

router.use(ensureNotAuth);
router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);
router.get("/signup", controller.signupGet);
router.post("/signup", controller.signupPost);

module.exports = router;
