const path = require("path");
const http = require("http");
const fs = require("fs/promises");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url,
  );

  let code = 200;
  let type = {
    "Content-Type": "text/html",
  };

  fs.readFile(filePath, { encoding: "utf-8" })
    .catch((e) => {
      if (e.code === "ENOENT") {
        code = 404;
        return fs.readFile("./public/404.html", { encoding: "utf-8" });
      } else throw e;
    })
    .catch((e) => {
      code = 500;
      headers = undefined;
      return `There was a fatal error with code: ${e.code}\n`;
    })
    .then((content) => {
      res.writeHead(code, type);
      res.end(content);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
