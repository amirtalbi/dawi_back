const express =require('express')
const router= express.Router()
const SupportCoursController=require('../Controllers/supportCours')

router.post('/supportCours',SupportCoursController.newSupportCours);
router.get('/supportCours',SupportCoursController.getAllSupportCourss);
router.get('/supportCours/:id',SupportCoursController.getOneSupportCours)
router.put('/supportCours/:id',SupportCoursController.updateSupportCours)
router.delete('/supportCours/:id',SupportCoursController.deleteSupportCours)
module.exports=router;