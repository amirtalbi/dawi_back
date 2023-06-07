const offre = require('../Models/offreAlternance')
const {Offre}=require('../db/sequelize')

exports.getOneOffreAlternance=(req,res)=>{
  const id=req.params.id
  Offre.findByPk(id).then(offre=>{
      if(offre===null){
          const message=`L'offre ${id} n'existe pas`
          return res.status(400).json({message,data:error})
      }
      const message=`L'offre ${id} a été récuperé`
      return res.status(201).json({message,data:offre})
  }).catch(error=>{
      const message=`L'offre ${id} n'a pas pu etre récuperé. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}

exports.getAllOffreAlternances=(req,res)=>{
  Offre.findAll().then(offre=>{
      const message="Liste des Offres:"
      return res.json({message,data:offre})
  }).catch(error=>{
      const message=`La liste des Offres n'a pas pu être recupérer. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}

exports.newOffreAlternance=(req,res)=>{
  Offre.create(req.body).then(offre=>{
      if(offre===null){
          const message=`L'offre n'est pas créer.`
          return res.status(404).json({message})
      }
      const message=`L'offre a été crée  id:${offre.id}`
      return res.json({message,data:offre})
  }).catch(error=>{
      const message=`L'offre n'a pas pu être créer. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
})
}

exports.updateOffreAlternance=(req,res)=>{
  const id=req.params.id
  Offre.update(req.body,{where:{id:id}}).then(()=>{
      return Offre.findByPk(id).then(offre=>{
          if(offre.id===null){
              const message=`L'offre n'existe pas.`
              return res.status(404).json({message})
          }
          const message=`L'offre ayant pour id: ${offre.id} a été mis à jour `
          return res.status(201).json({message,data:offre})
      })
  }).catch(error=>{
      const message=`L'offre n'a pas pu être modifié. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})})
}

exports.deleteOffreAlternance=(req,res)=>{
  const id=req.params.id
  Offre.findByPk(id).then(offre=>{
      if(offre===null){
          const message=`L'offre n'existe pas.`
          return res.status(404).json({message})
      }
      const message=`L'offre ${id} à bien été supprimé`
      return Offre.destroy(id).then(res.status(201).json({message,data:offre}))
  }).catch(error=>{
      const message=`L'offre n'a pas pu etre supprimé. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}