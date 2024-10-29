const express = require("express");

const controller = require("../controllers/tagsController");
const router = express.Router();

router.get("/", controller.getTags);
router.get("/:tag/posts", controller.getPostsByTag);

module.exports = router;
