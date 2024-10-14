module.exports = class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg || "You do not have permission to view this file.");
    this.statusCode = 403;
    this.name = "UnauthorizedError";
  }
};
