module.exports = class CastError extends Error {
  constructor() {
    super();
    this.name = 'CastError';
  }
};
