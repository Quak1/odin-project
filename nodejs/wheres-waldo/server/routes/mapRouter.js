const express = require("express");
const router = express.Router();

const controller = require("../controllers/mapController");
const {
  validateInt,
  handleValidationErrors,
  validateUsername,
} = require("../controllers/validators");

// Get maps info
router.get("/", controller.getMaps);

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
router.get(
  "/:mapId/done",
  validateInt("param", "mapId"),
  handleValidationErrors,
  controller.isDone,
);

// Get top scores
router.get(
  "/:mapId/top-scores",
  validateInt("param", "mapId"),
  handleValidationErrors,
  controller.getTopScores,
);

router.post(
  "/:mapId/score",
  validateInt("param", "mapId"),
  validateUsername(),
  handleValidationErrors,
  controller.recordScore,
);

module.exports = router;
