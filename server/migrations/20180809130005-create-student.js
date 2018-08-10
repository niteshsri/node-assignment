module.exports = {
  up: (queryInterface, Sequelize) => {
     queryInterface.createTable('Students', {
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
      rollNo: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: true,
      },
      admissionDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      SemesterClassId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        references: {
          model: 'SemesterClasses',
          key: 'id'
        }
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default:false
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
     queryInterface.dropTable('Students');
  }
};