const express = require('express');
const createError = require('http-errors');
const crypto = require('crypto');
const router = express.Router();
const authMiddleware = require('../lib/basic-auth');
const Auth = require('basic-auth');
const { User } = require('../lib/database');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({attributes: ['username', 'name']});
    res.send(users);
  } catch (e) {
    return next(createError(500, e.message));

  }
});

/* POST a new user */
router.post('/', async (req, res, next) => {
  let { username, password, email, name } = req.body;

  const salt = crypto.randomBytes(256).toString('hex');
  password = crypto.pbkdf2Sync(password, salt, 10000, 256, 'sha512').toString('hex');

  try {
    const newUser = await User.create({
      username,
      email,
      name,
      password,
      salt
    });

    res.send(newUser);

  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return next(createError(400, `Error: username ${username} already exists.`));
    } else {
      return next(createError(400, 'Something went wrong: ' + e.message));
    }
  }
});

router.delete('/:username', authMiddleware, async (req, res, next) => {
  try {
    const { name } = Auth(req);
    if (name !== req.params.username) {
      return next(createError(401, 'Sorry, you can only delete your own account!'));
    }
    await User.destroy({where: {username: name}});
    res.send({'status': 'deleted'});
  } catch (e) {
    return next(createError(500, e.message));
  }
});

module.exports = router;
