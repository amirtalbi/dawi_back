module.exports =(sequelize,Datatypes)=>

{
    return sequelize.define('Eleve', {
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
})

};
