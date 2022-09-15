module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Numbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      company: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      place: {
        type: Sequelize.TEXT,
      },
      lat: {
        type: Sequelize.FLOAT,
      },
      lon: {
        type: Sequelize.FLOAT,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Numbers');
  },
};
