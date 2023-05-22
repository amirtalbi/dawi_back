

const express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const Modele_eleve = require('./Modeles/eleve.js')


const app = express()
const PORT = 3000


const sequelize = new Sequelize({
    username: 'root',
    password: '',
    database: 'RL',
    host: 'localhost',
    dialect: 'mysql'
  });


  sequelize.authenticate().then(() => {
      console.log('Connecté à la base de données MySQL.');
    })
    .catch((error) => {
      console.error('Erreur de connexion :', error);
    });

    const eleve = Modele_eleve(sequelize,DataTypes)



    

app.get("/eleve/create", async (req, res) => {
    eleve.create({
  nom: 'nelhomme',
  prenom: 'lhukas',
  date_naissance: '2005-01-01',
  classe: 'terminal2'
})
  .then((eleve) => {
    console.log('Elève créé avec succès:', eleve.toJSON());
  })
  .catch((error) => {
    console.error('Erreur lors de la création de l\'élève:', error);
  });     
})


app.get("/eleve/remove", async (req, res) => {
    try {
      const id = req.query.id;
      const deletedEleve = await eleve.destroy({ where: { id } });
      if (deletedEleve === 1) {
        res.status(200).send("L'élève a été supprimé avec succès.");
      } else {
        res.status(404).send("Échec de la suppression de l'élève.");
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'élève:', error);
      res.status(500).send("Une erreur s'est produite lors de la suppression de l'élève.");
    }
  });


  app.put("/eleve/update/", async (req, res) => {
    try {
      const id = req.query.id;
      const { nom, prenom, date_naissance, classe } = req.query;
      const updatedEleve = await eleve.update(
        { nom, prenom, date_naissance, classe },
        { where: { id } }
      );
      if (updatedEleve[0] === 1) {
        res.status(200).send("L'élève a été mis à jour avec succès.");
      } else {
        res.status(404).send("Échec de la mise à jour de l'élève.");
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'élève:', error);
      res.status(500).send("Une erreur s'est produite lors de la mise à jour de l'élève.");
    }
  });


sequelize.sync({force:true}).then(() => {
    console.log('Modèles synchronisés avec la base de données.');
    }).catch((error) => {
    console.error('Erreur lors de la synchronisation des modèles :', error);
  });

app.listen(PORT, function () {



})