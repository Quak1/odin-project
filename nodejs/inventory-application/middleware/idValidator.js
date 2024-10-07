const { param } = require("express-validator");

const idValidator = param("id")
  .isInt({ min: 1 })
  .withMessage("ID must be a positive integer");

module.exports = idValidator;
