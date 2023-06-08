module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      coeff: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      note: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      matiere: {
        type: DataTypes.STRING,
        allowNull: false
      },
      etudiantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Etudiants',
          key: 'id'
        }
      },
      enseignantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Enseignants',
          key: 'id'
        }
      }
    }, {
      timestamps:false
    });
  
    Note.associate = (models) => {
      Note.belongsTo(models.Etudiant, {
        foreignKey: 'etudiantId',
        as: 'etudiant'
      });
      Note.belongsTo(models.Enseignant, {
        foreignKey: 'enseignantId',
        as: 'enseignant'
      });
    };
  
    return Note;
  };
  