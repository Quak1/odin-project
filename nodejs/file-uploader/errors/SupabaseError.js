module.exports = class SupabaseError extends Error {
  constructor(e) {
    super(e.message);
    this.statusCode = e.statusCode;
    this.name = e.error;
  }
};
