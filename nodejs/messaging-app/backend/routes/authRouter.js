const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");
const {
  loginValidator,
  registerValidator,
  handleValidationErrors,
} = require("../middleware/validators");

router.post(
  "/login",
  loginValidator(),
  handleValidationErrors,
  controller.login,
);
router.get("/logout", controller.logout);
router.post(
  "/register",
  registerValidator(),
  handleValidationErrors,
  controller.register,
);

module.exports = router;
