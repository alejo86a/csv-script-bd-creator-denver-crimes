const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const locale = require('koa-locale');
const i18n = require('koa-i18n');
const logger = require('./logger');
const timing = require('./middlewares/timing');
const { normalizePort } = require('./helpers/utils');

const app = new Koa();

// detecting locale
locale(app);

// adding security to headers
app.use(helmet());

// logging requests
app.use(timing());

// config i18n
app.use(i18n(app, {
  directory: `${__dirname}/locales`,
  locales: ['en', 'es', 'br'], // `en` defaultLocale, must match the locales to the filenames
  extension: '.json',
}));

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = { error: true, message: error.message, description: ctx.i18n.__(error.message) };
    logger.error({ message: error.message, status: ctx.status });
    if (!error.business) ctx.app.emit('error', error, ctx);
  }
});

// adding CORS header
app.use(cors());

// load middleware to parser body
app.use(bodyParser());

// Getting routes files
// const basic = require('./routes/basic');
const router = require('./routes');

// Integrating routes to server
// app.use(basic.routes());
// app.use(basic.allowedMethods());
app.use(router());

// Error on listen
const onError = (err) => {
  logger.error({ message: err.code, port: err.port });
};

// start server
const port = normalizePort(process.env.PORT, 4000);
const server = app.listen(port, () => {
  logger.info({ message: 'SERVER_LISTENING', port });
}).on('error', onError);

// Catch process when exit
process.on('exit', () => {
  logger.info({ message: 'SERVER_CLOSED' });
});

module.exports = { server, app, onError };
