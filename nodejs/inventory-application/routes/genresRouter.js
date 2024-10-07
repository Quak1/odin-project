const express = require("express");
const router = express.Router();
const controller = require("../controllers/genresController");

const idParser = require("../middleware/idParser");

router.get("/", controller.getGenres);
router.post("/", controller.postCreateGenre);
router.post("/:id", idParser, controller.postUpdateGenre);
router.delete("/:id", idParser, controller.deleteGenre);

module.exports = router;
