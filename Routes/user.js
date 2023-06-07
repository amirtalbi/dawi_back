const express =require('express')
const router= express.Router()
const UserController=require('../Controllers/user')

router.get('/login/:numero_etudiant/:password',UserController.login);
router.post('/user',UserController.newUser);
router.get('/users',UserController.getAllUsers);
router.get('/user/:id',UserController.getOneUser)
router.put('/user/:id',UserController.updateUser)
router.delete('/user/:id',UserController.deleteUser)
module.exports=router;