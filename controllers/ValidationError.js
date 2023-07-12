module.exports = class ValidationError extends Error {
  constructor() {
    super();
    this.name = 'ValidationError';
  }
};
