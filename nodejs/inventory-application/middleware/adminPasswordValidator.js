const { body, validationResult } = require("express-validator");

const adminPassword = process.env.ADMIN_PASSWORD;
const adminPasswordValidator = body("adminPwd")
  .matches(adminPassword)
  .withMessage("Wrong adming password");

const adminPasswordErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).send(errors);
  else next();
};

module.exports = { adminPasswordValidator, adminPasswordErrorHandler };
