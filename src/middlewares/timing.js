const logger = require('../logger');

// Middleware to measurement all requests
const timing = () => async (ctx, next) => {
  const start = process.hrtime();
  await next();
  const delta = process.hrtime(start);
  logger.info({ message: 'REQUEST', method: ctx.method, url: ctx.originalUrl, seconds: delta[0], ms: delta[1] / 1000000 });
};

module.exports = timing;
