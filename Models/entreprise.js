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
      },email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    });
  
    return Entreprise;
  };
  