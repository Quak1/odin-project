import { createServer } from "node:http";
import { URL } from "node:url";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write(req.url);

  const url = new URL(req.url, `http://${req.headers.host}`);
  url.searchParams.forEach((value, key) => res.write(`\n${key}: ${value}`));

  res.end("\nHello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
