module.exports = (sequelize, DataTypes) => {
    const Entreprise = sequelize.define('Entreprise', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      adresse: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ville: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pays: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'creation',
      updatedAt: 'modifie'
    });
  
    return Entreprise;
  };
  