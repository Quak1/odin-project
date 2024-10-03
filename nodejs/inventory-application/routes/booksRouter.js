const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController");

router.get("/", controller.allBooksGet);

router.get("/create", controller.createBookGet);
router.post("/create", controller.createBookPost);

router.get("/:id/edit", controller.bookEditGet);
router.post("/:id/edit", controller.bookEditPost);

router.delete("/:id/delete", controller.bookDelete);

router.get("/:id", controller.bookGet);

module.exports = router;
