const express = require("express");
const router = express.Router();
const controller = require("../controllers/genresController");

router.get("/", controller.getGenres);
router.post("/", controller.postCreateGenre);
router.post("/:id", controller.postUpdateGenre);

module.exports = router;