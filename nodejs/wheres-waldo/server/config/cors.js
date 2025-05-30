const cors = require("cors");

module.exports = cors({
  origin: process.env.WEB_URL,
  methods: "GET",
  credentials: true,
});
