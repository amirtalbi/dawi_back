

const express=require('express')
const sequelize=require('./db/sequelize')
const bodyParser = require('body-parser');
const cors = require('cors');
const app=express()
const PORT =3000


const etudiantRoutes=require('./Routes/etudiant')
const enseignantRoutes=require('./Routes/enseignant')
const entrepriseRoutes=require('./Routes/entreprise')
const noteRoutes=require('./Routes/note')
const offreAlternancetRoutes=require('./Routes/offreAlternance')
const projetTutoreRoutes=require('./Routes/projetTutore')
const supportCoursRoutes=require('./Routes/supportCours')
const userRoutes=require('./Routes/user')

app.use(cors());
app.use(bodyParser.json());
app.use('',etudiantRoutes)
app.use('',enseignantRoutes)
app.use('',entrepriseRoutes)
app.use('',noteRoutes)
app.use('',offreAlternancetRoutes)
app.use('',projetTutoreRoutes)
app.use('',supportCoursRoutes)
app.use('',userRoutes)

sequelize.initialisationDb()
app.use(bodyParser.json());
app.use(({res})=>{
    const message="Impossible de trouver la ressource demandé ! Vous pouvez essayer un autre URL."
    res.status(404).json({message})
});

app.listen(PORT, function () {})