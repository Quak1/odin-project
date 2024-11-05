class NotFoundError extends Error {
  constructor(msg) {
    super(msg || "Resource not found");
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg || "You do not have permission to do this.");
    this.statusCode = 403;
    this.name = "UnauthorizedError";
  }
}

class ValidationError extends Error {
  constructor(msg) {
    super();
    this.message = {};
    msg.forEach((error) => (this.message[error.path] ??= []).push(error.msg));
    this.statusCode = 400;
    this.name = "ValidationError";
  }
}

module.exports = {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
};