const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const authMiddleware = require('../lib/basic-auth');
const Auth = require('basic-auth');
const { Tweet } = require('../lib/database');

/* GET all the tweets from a user */
router.get('/:author', async (req, res, next) => {
  const { author } = req.params;
  try {
    const tweets = await Tweet.findAll({ where: { author } });
    res.send(tweets);
  } catch (e) {
    return next(createError(500, e.message));
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { content } = req.body;
    const { name } = Auth(req);
    const newTweet = await Tweet.create({ author: name, content });
    res.send(newTweet);
  } catch (e) {
    return next(createError(500, e.message));
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { name } = Auth(req);
    const { id } = req.params;
    const rowsDeleted = await Tweet.destroy({where: {author: name, id}});
    if (rowsDeleted) {
      res.send({'status': 'deleted'});
    } else {
      return next(createError(400, 'Tweet not found.'));
    }
  } catch (e) {
    return next(createError(500, e.message));
  }
});

module.exports = router;
