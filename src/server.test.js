const test = require('ava');
const { onError } = require('./server');

test(':onError: should show an error', async t => {
  const port = await onError({
    code: 'EADDRINUSE',
    port: 3000,
  });
  t.pass();
});
