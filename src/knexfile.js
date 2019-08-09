// Update with your config settings.
const config = require('./config');
const { getPostgresConnection } = require('./helpers/utils');

module.exports = {

  development: {
    client: 'pg',
    connection: getPostgresConnection(config),
  },

  staging: {
    client: 'pg',
    connection: getPostgresConnection(config),
    pool: {
      min: 1,
      max: 5,
    },
    migrations: {
      tableName: 'staging_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: getPostgresConnection(config),
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'production_migrations',
    },
  },

};
