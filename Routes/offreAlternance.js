const express =require('express')
const router= express.Router()
const OffreAlternanceController=require('../Controllers/offreAlternance')

router.post('/offreAlternance',OffreAlternanceController.newOffreAlternance);
router.get('/offreAlternances',OffreAlternanceController.getAllOffreAlternances);
router.get('/offreAlternance/:id',OffreAlternanceController.getOneOffreAlternance)
router.put('/offreAlternance/:id',OffreAlternanceController.updateOffreAlternance)
router.delete('/offreAlternance/:id',OffreAlternanceController.deleteOffreAlternance)
module.exports=router;