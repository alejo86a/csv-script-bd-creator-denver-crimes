const jwt = require('jwt-simple');
const config = require('../config');
const errors = require('../errors');
const BusinessError = require('../business-error');

const {
  ISSUER,
  AUDIENCE,
  PUBLIC_ACCESS_KEY,
  SCOPE,
  AUTH_TYPE,
} = config;

const key = `
-----BEGIN PUBLIC KEY-----
${PUBLIC_ACCESS_KEY}
-----END PUBLIC KEY-----
`;

module.exports = async (ctx, next) => {
  if (!ctx.header.authorization) throw new BusinessError(errors.MISSING_AUTH_HEADER, 401);
  const [authType, token] = ctx.header.authorization.trim().split(' ');
  if (authType.toUpperCase() !== AUTH_TYPE) throw new BusinessError(errors.WRONG_AUTH_TYPE, 401);
  try {
    const decode = jwt.decode(token, key, false, 'RS256');
    const { scope, iss, aud, azp, preferred_username: username, resource_access: roles } = decode;
    if (iss !== ISSUER) throw new BusinessError(errors.WRONG_ISSUER, 403);
    if (!aud.includes(AUDIENCE)) throw new BusinessError(errors.WRONG_AUDIENCE, 403);
    if (!scope.includes(SCOPE)) throw new BusinessError(errors.WRONG_SCOPE, 403);
    ctx.user = { username };
    ctx.user.roles = roles[azp] && roles[azp].roles;
  } catch (error) {
    throw new BusinessError(error.message.replace(' ', '_').toUpperCase(), 403);
  }
  await next();
};
