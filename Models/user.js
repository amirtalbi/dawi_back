module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },role: {
        type: DataTypes.ENUM('étudiant', 'enseignant', 'entreprise'),
        allowNull: false
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    });
  
  
    return Users;
  };
  