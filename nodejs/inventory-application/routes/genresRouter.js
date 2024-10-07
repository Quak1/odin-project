const express = require("express");
const router = express.Router();

const controller = require("../controllers/genresController");
const idValidator = require("../middleware/idValidator");

router.get("/", controller.getGenres);
router.post("/", controller.postCreateGenre);

router.post("/:id", idValidator, controller.postUpdateGenre);
router.delete("/:id", idValidator, controller.deleteGenre);

module.exports = router;
