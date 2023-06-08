const {Sequelize,DataTypes} =require('sequelize')
const EtudiantModel=require('../Models/etudiant')
const EnseignantModel=require('../Models/enseignant')
const EntrepriseModel=require('../Models/entreprise')
const NoteModel=require('../Models/note')
const OffreAlternanceModel=require('../Models/offreAlternance')
const ProjetTutoreModel=require('../Models/projetTutore')
const SupportCoursModel=require('../Models/supportCours')
const UserModel=require('../Models/user')

const sequelize=new Sequelize('rl','root','',{
  host:'localhost',
  dialect:'mysql',
    logging: false
  })


    const initialisationDb= ()=>{
      return sequelize.sync(/*{force:true}*/).then(_=>{
      console.log('La base de donnée a été initialisée !')
  })
  }
  const Etudiant=EtudiantModel(sequelize,DataTypes)
  const Enseignant=EnseignantModel(sequelize,DataTypes)
  const Entreprise=EntrepriseModel(sequelize,DataTypes)
  const Note=NoteModel(sequelize,DataTypes)
  const OffreAlternance=OffreAlternanceModel(sequelize,DataTypes)
  const ProjetTutore=ProjetTutoreModel(sequelize,DataTypes)
  const SupportCours=SupportCoursModel(sequelize,DataTypes)
  const User=UserModel(sequelize,DataTypes)

  module.exports={
    initialisationDb,
    Etudiant,Enseignant,Entreprise,Note,OffreAlternance,ProjetTutore,SupportCours,User
}