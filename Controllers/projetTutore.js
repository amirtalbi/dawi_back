// const projetTutore = require('../Models/projetTutore')
const {ProjetTutore}=require('../db/sequelize')

exports.getOneProjetTutore=(req,res)=>{
  const id=req.params.id
  ProjetTutore.findByPk(id).then(projetTutore=>{
      if(projetTutore===null){
          const message=`Le projet tutoré ${id} n'existe pas`
          return res.status(400).json({message,data:error})
      }
      else{
        const message=`Le projet tutoré ${id} a été récuperé`
        return res.status(201).json({message,data:projetTutore})
      }
  }).catch(error=>{
      const message=`Le projet tutoré ${id} n'a pas pu etre récuperé. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}

exports.getAllProjetTutores=(req,res)=>{
  ProjetTutore.findAll().then(projetTutore=>{
      const message="Liste des ProjetTutores:"
      return res.json({message,data:projetTutore})
  }).catch(error=>{
      const message=`La liste des ProjetTutores n'a pas pu être recupérer. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}

exports.newProjetTutore=(req,res)=>{
  ProjetTutore.create(req.body).then(projetTutore=>{
      if(projetTutore===null){
          const message=`Le projet tutoré n'est pas créer.`
          return res.status(404).json({message})
      }else{
            const message=`Le projet tutoré a été crée  id:${projetTutore.id}`
            res.json({message,data:projetTutore})  
      }
  }).catch(error=>{
      const message=`Le projet tutoré n'a pas pu être créer. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
})
}

exports.updateProjetTutore=(req,res)=>{
  const id=req.params.id
  ProjetTutore.update(req.body,{where:{id:id}}).then(()=>{
      return ProjetTutore.findByPk(id).then(projetTutore=>{
          if(projetTutore.id===null){
              const message=`Le projet tutoré n'existe pas.`
              return res.status(404).json({message})
          }
          else{
            const message=`Le projet tutoré ayant pour id: ${projetTutore.id} a été mis à jour `
            return res.status(201).json({message,data:projetTutore})  
          }
      })
  }).catch(error=>{
      const message=`Le projet tutoré n'a pas pu être modifié. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})})
}

exports.deleteProjetTutore=(req,res)=>{
  const id=req.params.id
  ProjetTutore.findByPk(id).then(projetTutore=>{
      if(projetTutore===null){
          const message=`Le projet tutoré n'existe pas.`
          return res.status(404).json({message})
      }
      else{
        const message=`Le projet tutoré ${id} à bien été supprimé`
        return ProjetTutore.destroy({ where: { id } }).then(res.status(201).json({message,data:projetTutore}))  
      }
  }).catch(error=>{
      const message=`Le projet tutoré n'a pas pu etre supprimé. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}