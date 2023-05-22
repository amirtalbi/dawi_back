module.exports = (sequelize, DataTypes) => {
    const SupportCours = sequelize.define('SupportCours', {
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
      fichier: {
        type: DataTypes.STRING,
        allowNull: false
      },
      matiere: {
        type: DataTypes.STRING,
        allowNull: false
      },
      enseignantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Enseignant',
          key: 'id'
        }
      }
    }, {
      timestamps: true,
      createdAt: 'creation',
      updatedAt: 'modifie'
    });
  
    SupportCours.associate = (models) => {
      SupportCours.belongsTo(models.Enseignant, {
        foreignKey: 'enseignantId',
        as: 'enseignant'
      });
    };
  
    return SupportCours;
  };
  