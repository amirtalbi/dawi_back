module.exports = (sequelize, DataTypes) => {
    const OffreAlternance = sequelize.define('OffreAlternance', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      salaire: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      entrepriseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Entreprises',
          key: 'id'
        }
      }
    }, {
      timestamps: false
    });
  
    OffreAlternance.associate = (models) => {
      OffreAlternance.belongsTo(models.Entreprise, {
        foreignKey: 'entrepriseId',
        as: 'entreprises'
      });
    };
  
    return OffreAlternance;
  };
  