const express =require('express')
const router= express.Router()
const EtudiantController=require('../Controllers/etudiant')

router.post('/etudiant',EtudiantController.newEtudiant);
router.get('/etudiants',EtudiantController.getAllEtudiants);
router.get('/etudiant/:id',EtudiantController.getOneEtudiant)
router.put('/etudiant/:id',EtudiantController.updateEtudiant)
router.delete('/etudiant/:id',EtudiantController.deleteEtudiant)
module.exports=router;