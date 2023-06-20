const express =require('express')
const router= express.Router()
const NoteController=require('../Controllers/note')

router.post('/note',NoteController.newNote);
router.get('/notes',NoteController.getAllNotes);
router.get('/note/:id',NoteController.getUserNotes)
router.put('/note/:id',NoteController.updateNote)
router.delete('/note/:id',NoteController.deleteNote)
module.exports=router;