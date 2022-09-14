const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Number }) {
      this.hasMany(Number, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    pass: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
