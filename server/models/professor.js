module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    universityStaffNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    hooks: {
      afterCreate: (professor, options, cb)  => {
         Professor.update({
          universityStaffNo:professor.id
        }, {
          where: {
            id: professor.id
          },
          transaction: options.transaction
        });
        return professor;
      }
    }
  });

  Professor.associate = (models) =>{
  };
  return Professor;
};