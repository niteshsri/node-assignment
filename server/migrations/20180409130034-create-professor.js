module.exports = {
  up: (queryInterface, Sequelize) => {
     queryInterface.createTable('Professors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      universityStaffNo: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      designation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
     queryInterface.dropTable('Professors');
  }
};