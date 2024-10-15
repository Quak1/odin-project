const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const rootGet = asyncHandler(async (req, res) => {
  const files = await queries.getAllFiles(req.user.id);
  res.render("folder", { title: "Files", files });
});

module.exports = { rootGet };
