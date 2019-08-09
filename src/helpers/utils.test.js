const pg = require('knex');
const test = require('ava');
const logger = require('../logger');
const config = require('../config');
const utils = require('./utils');

const fake = {
  PG_USER: 'fake',
  PG_PASSWORD: 'fake',
  PG_DATABASE: 'fake',
}

const db = pg({
  client: 'pg',
  connection: utils.getPostgresConnection(config),
  searchPath: ['public'],
});

const bad = pg({
  client: 'pg',
  connection: utils.getPostgresConnection(fake),
  searchPath: ['public'],
});

test(':normalizePort: should return PORT valid', t => {
  const response = utils.normalizePort(config.PORT, 4000);
  t.is(response, 3000);
});

test(':normalizePort: should return PORT 80', t => {
  const response = utils.normalizePort('BAD', -1);
  t.is(response, 80);
});

test(':checkPostgresConnection: should return true when postgres connected', async t => {
  const response = await utils.checkPostgresConnection(db, logger, false);
  t.is(typeof response, 'boolean');
  t.true(response);
});

test(':checkPostgresConnection: should fail and return false when postgres NOT connected', async t => {
  const response = await utils.checkPostgresConnection(bad, logger, false);
  t.is(typeof response, 'boolean');
  t.false(response);
});

test(':checkPostgresConnection: should exit when postgres NOT connected', async t => {
  const response = await utils.checkPostgresConnection(bad, logger);
  t.is(typeof response, 'boolean');
  t.false(response);
});

test(':getPostgresConnection: should return postgres connection valid', t => {
  const response = utils.getPostgresConnection({
    PG_USER: 'postgres',
    PG_PASSWORD: 'postgres',
    PG_DATABASE: 'postgres',
  });
  t.is(typeof response, 'string');
  t.is(response, 'postgres://postgres:postgres@localhost:5432/postgres');
});

test(':getPostgresConnection: should return postgres default connection', t => {
  const response = utils.getPostgresConnection({ PG_CONNECTION_STRING: 'PG_CONNECTION_STRING' });
  t.is(typeof response, 'string');
  t.is(response, 'PG_CONNECTION_STRING');
});

test(':getPostgresConnection: should return empty postgres connection', t => {
  const response = utils.getPostgresConnection({});
  t.is(typeof response, 'object');
});
