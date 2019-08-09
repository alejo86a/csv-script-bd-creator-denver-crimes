const pg = require('knex');
const config = require('./config');
const { getPostgresConnection, checkPostgresConnection } = require('./helpers/utils');

const knex = pg({
  client: 'pg',
  connection: getPostgresConnection(config),
  searchPath: ['public'],
});

const logger = require('./logger');

// Trying connection to database
// to continue running service
checkPostgresConnection(knex, logger);

// Array used to store the query times
// where the query unique id is the key.
const times = {};

// Use query/query-response events
// to measure SQL query executions
// only when QUERY_LOGS exists
if (config.QUERY_LOGS) {
  knex.on('query', ({ __knexQueryUid: uid }) => {
    times[uid] = process.hrtime();
  }).on('query-response', (response, query) => {
    const uid = query.__knexQueryUid;
    times[uid] = process.hrtime(times[uid]);
    logger.info({ message: 'QUERY_EXECUTED', uid, seconds: times[uid][0], ms: times[uid][1] / 1000000, sql: query.sql });
    // Delete this query identifier.
    delete times[uid];
  });
}

module.exports = knex;
