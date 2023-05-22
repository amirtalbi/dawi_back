

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


  sequelize
    .authenticate()
    .then(() => {
      console.log('Connecté à la base de données MySQL.');
    })
    .catch((error) => {
      console.error('Erreur de connexion :', error);
    });

    const eleve = Modele_eleve(sequelize,DataTypes)
    

app.get("/connexion", async (req, res) => {


      
})


app.listen(PORT, function () {



})