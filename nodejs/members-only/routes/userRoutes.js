const express = require("express");
const router = express.Router();

const { isAuth, ensureNotAuth } = require("./isAuth");
const controller = require("../controllers/userController");

router.get("/signup", ensureNotAuth, controller.signupGet);
router.post("/signup", ensureNotAuth, controller.signupPost);

router.get("/login", ensureNotAuth, controller.loginGet);
router.post("/login", ensureNotAuth, controller.loginPost);

router.get("/logout", controller.logoutGet);

router.get("/join_member", isAuth, controller.memberGet);
router.post("/join_member", isAuth, controller.memberPost);

router.get("/join_admin", isAuth, controller.adminGet);
router.post("/join_admin", isAuth, controller.adminPost);

module.exports = router;
