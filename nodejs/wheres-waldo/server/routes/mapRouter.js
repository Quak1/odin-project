const express = require("express");
const router = express.Router();

const controller = require("../controllers/mapController");
const {
  validateInt,
  handleValidationErrors,
} = require("../controllers/validators");

// Get maps info
router.get("/", controller.getMaps);

router.get("/session", (req, res) => {
  res.status(200).json(req.session);
});

// Generate random chars
router.get(
  "/:mapId",
  validateInt("param", "mapId"),
  validateInt("query", "n"),
  handleValidationErrors,
  controller.getRandomChars,
);

// Test if tag is valid
router.get(
  "/:mapId/char/:charId/tag",
  validateInt("param", "mapId", "charId"),
  validateInt("query", "x", "y"),
  handleValidationErrors,
  controller.checkTag,
);

// Check if player is done
router.get("/:mapId/done", controller.isDone);

module.exports = router;
