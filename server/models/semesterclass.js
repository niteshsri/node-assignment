module.exports = (sequelize, DataTypes) => {
  const SemesterClass = sequelize.define('SemesterClass', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  });
  SemesterClass.associate = (models) => {
    SemesterClass.hasMany(models.Student, {
      foreignKey: 'SemesterClassId',
      onDelete: 'NO ACTION',
    });
    SemesterClass.belongsTo(models.Professor, {
      foreignKey: 'ProfessorId',
      onDelete: 'NO ACTION',
    });
  };
  return SemesterClass;
};