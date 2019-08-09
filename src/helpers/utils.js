const axios = require('axios');
const axiosRetry = require('axios-retry');

const options = {
  retries: process.env.REQUEST_RETRIES || 3,
};

if (process.env.REQUEST_EXPONENTIAL) options.retryDelay = axiosRetry.exponentialDelay;

axiosRetry(axios, options);

/**
 * Check connection to database
 * @param {object} db - Connection to database
 * @param {object} logger - Logger configured
 * @param {boolean} [exit] - Force exit app
 */
const checkPostgresConnection = async (db, logger, exit = true) => {
  try {
    await db.raw("SELECT '1';");
    logger.info({ message: 'DATABASE_CONNECTION_SUCCESSFUL' });
    return true;
  } catch (error) {
    logger.error({ message: 'FAIL_CONNECTING_DATABASE', reason: error.code, address: error.address, port: error.port });
    if (exit) process.exit(0);
    return false;
  }
};

/**
 * Normalize port
 * @param {string} val - Port to validate
 * @param {number} def - Default port
 * @returns {number} port - Port to use
 */
const normalizePort = (val, def) => {
  let port = parseInt(val, 10);
  // Valid if numeric
  if (Number.isNaN(port)) port = def;
  // Port is positive
  if (port >= 0) return port;
  // NOT valid port
  return 80;
};

/**
 * Get postgres connection string
 * @returns {number} port - Port to use
 */
const getPostgresConnection = (environment) => {
  // try getting values
  const {
    PG_CONNECTION_STRING,
    PG_USER,
    PG_PASSWORD,
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
  } = environment;
  const port = PG_PORT || 5432;
  const host = PG_HOST || 'localhost';
  // Verify and construct connection
  if (PG_CONNECTION_STRING) return PG_CONNECTION_STRING;
  if (PG_USER && PG_PASSWORD && PG_DATABASE) return `postgres://${PG_USER}:${PG_PASSWORD}@${host}:${port}/${PG_DATABASE}`;
  return {};
};

module.exports = {
  normalizePort,
  checkPostgresConnection,
  getPostgresConnection,
  request: axios,
};
