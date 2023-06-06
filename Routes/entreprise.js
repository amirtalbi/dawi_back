const express =require('express')
const router= express.Router()
const EntrepriseController=require('../Controllers/entreprise')

router.post('/entreprise',EntrepriseController.newEntreprise);
router.get('/entreprises',EntrepriseController.getAllEntreprises);
router.get('/entreprise/:id',EntrepriseController.getOneEntreprise)
router.put('/entreprise/:id',EntrepriseController.updateEntreprise)
router.delete('/entreprise/:id',EntrepriseController.deleteEntreprise)
module.exports=router;