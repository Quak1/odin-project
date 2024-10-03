const express = require("express");
const router = express.Router();
const controller = require("../controllers/genresController");

router.get("/", controller.getGenres);
router.post("/", controller.postCreateGenre);

module.exports = router;
