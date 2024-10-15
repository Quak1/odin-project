const multer = require("multer");

module.exports = multer({
  //storage: multer.memoryStorage(),
  dest: "uploads/",
  limits: { fileSize: 1 * 1024 * 1024 },
});
