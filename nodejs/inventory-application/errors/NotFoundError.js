class NotFoundError extends Error {
  constructor(msg) {
    super(msg || "404 Page not found");
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
