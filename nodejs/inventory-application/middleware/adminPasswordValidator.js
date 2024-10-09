const { body } = require("express-validator");

const adminPassword = process.env.ADMIN_PASSWORD;
const passwordValidator = body("adminPwd")
  .matches(adminPassword)
  .withMessage("Wrong adming password");

module.exports = passwordValidator;
