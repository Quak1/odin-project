const express = require("express");
const router = express.Router();

const controller = require("../controllers/mapController");

// Get maps info
router.get("/", controller.getMaps);

// Generate random chars
router.get("/:id", controller.getRandomChars);

// Test if tag is valid
router.get("/:mapId/char/:charId/tag", controller.checkTag);

// Check if player is done
// router.get("/:id/done", () => {});

module.exports = router;
