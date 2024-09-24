const path = require("path");
const http = require("http");
const fs = require("fs/promises");

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url,
  );

  fs.readFile(filePath, { encoding: "utf-8" })
    .then((content) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
    })
    .catch((e) => {
      if (e.code === "ENOENT")
        return fs.readFile("./public/404.html", { encoding: "utf-8" });
      else throw e;
    })
    .then((content) => {
      if (content) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content);
      }
    })
    .catch((e) => {
      res.writeHead(500);
      res.end(`There was a fatal error with code: ${e.code}\n`);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
