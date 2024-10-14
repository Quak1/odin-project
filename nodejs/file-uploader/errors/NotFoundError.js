module.exports = class NotFoundError extends Error {
  constructor(msg) {
    super(msg || "Page not found");
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
};
