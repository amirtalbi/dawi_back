const express =require('express')
const router= express.Router()
const ProjetTutoresController=require('../Controllers/projetTutore')

router.post('/projetTutore',ProjetTutoresController.newProjetTutore);
router.get('/projetTutores',ProjetTutoresController.getAllProjetTutores);
router.get('/projetTutore/:id',ProjetTutoresController.getOneProjetTutore)
router.put('/projetTutore/:id',ProjetTutoresController.updateProjetTutore)
router.delete('/projetTutore/:id',ProjetTutoresController.deleteProjetTutore)
module.exports=router;