const auth = require('basic-auth');
const crypto = require('crypto');
const createError = require('http-errors');
const { User } = require('../lib/database');


module.exports = async (req, res, next) => {
  const credentials = auth(req);

  // Check credentials
  if (credentials) {
    const okToLogin =  await check(credentials.name, credentials.pass);
    if (okToLogin) {
      next();
    } else {
      return next(createError(401, 'Access denied'));
    }
  } else {
    return next(createError(401, 'Access denied'));
  }
};

const check = async (username, password) => {
  try {
    const user = await User.findOne({where: {username}});
    return crypto.pbkdf2Sync(password, user.salt, 10000, 256, 'sha512').toString('hex') === user.password;

  } catch (e) {
    return false;
  }
};
