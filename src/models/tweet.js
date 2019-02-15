module.exports = (sequelize, type) => {
  return sequelize.define('tweet', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: type.STRING(255),
      allowNull: false
    },
    author: {
      type: type.STRING(255),
      allowNull: false
    }
  });
};
