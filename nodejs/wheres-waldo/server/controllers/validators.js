const { param, query, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: errors.array({ onlyFirstError: true })[0] });
  }

  next();
};

const validateInt = (source, ...fields) => {
  const f = source === "param" ? param : query;

  return fields.map((field) =>
    f(field)
      .exists()
      .withMessage(`${field} is required`)
      .isInt()
      .withMessage(`${field} must be a number`)
      .toInt(),
  );
};

const validateUsername = () =>
  query("username")
    .exists()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage(
      "Username must be alphanumeric. Avoid spaces and other special characters.",
    );

module.exports = {
  handleValidationErrors,
  validateInt,
  validateUsername,
};
