module.exports = (sequelize, DataTypes) => {
    const Enseignant = sequelize.define('Enseignant', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      matiere: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: false
          }
      }
    }, {
      timestamps: false
    });
  
    return Enseignant;
  };
  