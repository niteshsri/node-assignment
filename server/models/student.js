module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    rollNo: {
      type:DataTypes.INTEGER,
      unique: true,
      allowNull: true,
    },
    admissionDate: {
      type:DataTypes.DATE,
      allowNull: false,
    },
    active: {
     type: DataTypes.BOOLEAN,
     allowNull: false,
     default:false
    }
    
  },{
    //updating but not giving rollnumber in response
    hooks: {
      afterCreate: (student, options, cb)  => {
         Student.update({
          rollNo:student.id
        }, {
          where: {
            id: student.id
          },
          transaction: options.transaction
        });
        return student;
      }
    }
  });
  Student.associate = (models) => {
    Student.belongsTo(models.SemesterClass, {
      foreignKey: 'SemesterClassId',
      onDelete: 'NO ACTION',
    });
  };
  // Student.sync({force: true});
  return Student;
};