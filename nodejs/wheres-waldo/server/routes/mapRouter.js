const express = require("express");
const router = express.Router();

const controller = require("../controllers/mapController");

// Get maps info
router.get("/", () => {});

// Generate random chars
router.get("/:id/chars", () => {});

// Check if player is done
router.get("/:id/done", () => {});

module.exports = router;
