const express =require('express')
const router= express.Router()
const EnseignantController=require('../Controllers/enseignant')

router.post('/enseignant',EnseignantController.newEnseignant);
router.get('/enseignants',EnseignantController.getAllEnseignants);
router.get('/enseignant/:id',EnseignantController.getOneEnseignant)
router.put('/enseignant/:id',EnseignantController.updateEnseignant)
router.delete('/enseignant/:id',EnseignantController.deleteEnseignant)
module.exports=router;