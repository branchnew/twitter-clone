const Sequelize = require('sequelize');
const UserModel = require('../models/user');
const TweetModel = require('../models/tweet');

const connection = new Sequelize('twitter', 'twitter', 'twitsecret', {
  host: 'mariadb',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = UserModel(connection, Sequelize);
const Tweet = TweetModel(connection, Sequelize);

User.hasMany(Tweet, { foreignKey: 'author' });

connection.sync().then(() => {
  console.log(`Database & tables synchronized!`);
});

module.exports = {
  User,
  Tweet
};
