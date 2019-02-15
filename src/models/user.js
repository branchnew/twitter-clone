module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    username: {
      type: type.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: type.STRING(255),
      allowNull: false
    },
    email: {
      type: type.STRING(255),
      allowNull: false
    },
    password: {
      type: type.STRING(512),
      allowNull: false
    },
    salt: {
      type: type.STRING(512),
      allowNull: false
    }
  });
};
