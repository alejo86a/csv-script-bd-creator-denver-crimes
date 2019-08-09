const winston = require('winston');
const { Loggly } = require('winston-loggly-bulk');
const config = require('./config');

// We use GELF Payload Specification according to
// http://docs.graylog.org/en/3.0/pages/gelf.html
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: {
    version: config.GELF_VERSION,
    host: config.APP_HOST,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({ filename: 'server.log' }),
  ],
});

// You could use any log management service available
// like LogDNA, GrayLog2, Logsene, Amazon SNS, etc.
if (config.LOGGLY_TOKEN) {
  logger.info({ message: 'LOADING_LOGGLY' });
  logger.add(new Loggly({
    token: config.LOGGLY_TOKEN,
    subdomain: config.LOGGLY_SUBDOMAIN,
    tags: ['rappi'],
    json: true,
  }));
}

/* Logging levels conform by RFC5424
** https://tools.ietf.org/html/rfc5424
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5,
};
*/

module.exports = logger;
