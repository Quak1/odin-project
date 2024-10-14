module.exports = class ExpiredLinkError extends Error {
  constructor(msg) {
    super(msg || "The sharing link you are trying to access has expired.");
    this.statusCode = 410;
    this.name = "ExpiredLinkError";
  }
};
