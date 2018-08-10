module.exports = {
  up: (queryInterface, Sequelize) => {
     queryInterface.createTable('SemesterClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ProfessorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        references: {
          model: 'Professors',
          key: 'id'
        }
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
     queryInterface.dropTable('SemesterClasses');
  }
};