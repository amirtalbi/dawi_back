    module.exports =(sequelize,Datatypes)=>

    {
        return sequelize.define('Etudiant', {
    id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: Datatypes.STRING,
        allowNull: false
    },
    prenom: {
        type: Datatypes.STRING,
        allowNull: false
    },
    date_naissance: {
        type: Datatypes.DATEONLY,
        allowNull: false
    },
    classe: {
        type: Datatypes.STRING,
        allowNull: false
    }
    }, {
        timestamps: true,
        createdAt : "cree",
        updatedAt : "modifie"
        // Désactive les colonnes `updatedAt` et `createdAt`
    });

    };
