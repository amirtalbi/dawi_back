module.exports = (sequelize, DataTypes) => {
    const ProjetTutore = sequelize.define('ProjetTutore', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nbEleve: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
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
  
    ProjetTutore.associate = (models) => {
      ProjetTutore.belongsTo(models.Entreprise, {
        foreignKey: 'entrepriseId',
        as: 'entreprises'
      });
    };
  
    return ProjetTutore;
  };
  