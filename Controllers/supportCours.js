const supportCours = require('../Models/supportCours')
const {SupportCours}=require('../db/sequelize')

exports.getOneSupportCours=(req,res)=>{
  const id=req.params.id
  SupportCours.findByPk(id).then(supportCours=>{
      if(supportCours===null){
          const message=`Le support de cours ${id} n'existe pas`
          return res.status(400).json({message,data:error})
      }
      const message=`Le support de cours ${id} a été récuperé`
      return res.status(201).json({message,data:supportCours})
  }).catch(error=>{
      const message=`Le support de cours ${id} n'a pas pu etre récuperé. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}

exports.getAllSupportCourss=(req,res)=>{
  SupportCours.findAll().then(supportCours=>{
      const message="Liste des SupportCourss:"
      return res.json({message,data:supportCours})
  }).catch(error=>{
      const message=`La liste des SupportCourss n'a pas pu être recupérer. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}

exports.newSupportCours=(req,res)=>{
  SupportCours.create(req.body).then(supportCours=>{
      if(supportCours===null){
          const message=`Le support de cours n'est pas créer.`
          return res.status(404).json({message})
      }
      const message=`Le support de cours a été crée  id:${supportCours.id}`
      return res.json({message,data:supportCours})
  }).catch(error=>{
      const message=`Le support de cours n'a pas pu être créer. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
})
}

exports.updateSupportCours=(req,res)=>{
  const id=req.params.id
  SupportCours.update(req.body,{where:{id:id}}).then(()=>{
      return SupportCours.findByPk(id).then(supportCours=>{
          if(supportCours.id===null){
              const message=`Le support de cours n'existe pas.`
              return res.status(404).json({message})
          }
          const message=`Le support de cours ayant pour id: ${supportCours.id} a été mis à jour `
          return res.status(201).json({message,data:supportCours})
      })
  }).catch(error=>{
      const message=`Le support de cours n'a pas pu être modifié. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})})
}

exports.deleteSupportCours=(req,res)=>{
  const id=req.params.id
  SupportCours.findByPk(id).then(supportCours=>{
      if(supportCours===null){
          const message=`Le support de cours n'existe pas.`
          return res.status(404).json({message})
      }
      const message=`Le support de cours ${id} à bien été supprimé`
      return SupportCours.destroy(id).then(res.status(201).json({message,data:supportCours}))
  }).catch(error=>{
      const message=`Le support de cours n'a pas pu etre supprimé. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}