const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Number extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Number.init({
    company: DataTypes.STRING,
    phone: DataTypes.STRING,
    place: DataTypes.TEXT,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Number',
  });
  return Number;
};
