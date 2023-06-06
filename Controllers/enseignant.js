// const enseignant = require('../Models/enseignant')
const {Enseignant,User}=require('../db/sequelize')
const bcrypt = require('bcrypt')

exports.getOneEnseignant=(req,res)=>{
  const id=params.id
  Enseignant.findByPk(id).then(enseignant=>{
      if(enseignant===null){
          const message=`L'enseignant ${id} n'existe pas`
          res.status(400).json({message,data:error})
      }
      const message=`L'enseignant ${id} a été récuperé`
      res.status(201).json({message,data:enseignant})
  }).catch(error=>{
      const message=`L'enseignant ${id} n'a pas pu etre récuperé. Réessayez dans quelques instants.`
      res.status(500).json({message,data:error})
  })
}

exports.getAllEnseignants=(req,res)=>{
  Enseignant.findAll().then(enseignant=>{
      const message="Liste des Enseignants:"
      res.json({message,data:enseignant})
  }).catch(error=>{
      const message=`La liste des Enseignants n'a pas pu être recupérer. Réessayez dans quelques instants.`
      res.status(500).json({message,data:error})
  })
}
exports.newEnseignant=(req,res)=>{
    bcrypt.hash(req.body.password,10).then(
        hashedPassword=>{
            User.create({
                numero:req.body.numero,
                login:req.body.login,
                password:hashedPassword,
                role:req.body.role
            }).then(user=>{
                if(user===null){
                    const message=`L'utilisateur n'est pas créer.`
                    res.status(404).json({message})
                }
                Enseignant.create(
                    {nom:req.body.nom,
                        prenom:req.body.prenom,
                        matiere:req.body.matiere,
                        email:req.body.email,
                        telephone:req.body.telephone}
                    ).then(enseignant=>{
                    if(enseignant===null){
                        const message=`L'enseignant n'est pas créer.`
                        res.status(404).json({message})
                    }
                    iud=enseignant.id
                    User.update(iud,{where:{id:user.id}}).then(_=>{
                        const message=`L'enseignant a été crée  id:${enseignant.id}`
                        res.json({message,data:enseignant})
                    })
                }).catch(error=>{
                    const message=`L'enseignant n'a pas pu être créer. Réessayez dans quelques instants.`
                    res.status(500).json({message,data:error})
            })
            }).catch(error=>{
                const message=`L'utilisateur n'a pas pu être créer. Réessayez dans quelques instants.`
                res.status(501).json({message,data:error})
          })
        }
    ).catch(error=>{
        const message=`Une erreur a été rencontré. Réessayez dans quelques instants.`
        res.status(500).json({message,data:error})
  })
}

exports.updateEnseignant=(req,res)=>{
  const id=req.params.id
  Enseignant.update(req.body,{where:{id:id}}).then(()=>{
      return Enseignant.findByPk(id).then(enseignant=>{
          if(enseignant.id===null){
              const message=`L'enseignant n'existe pas.`
              res.status(404).json({message})
          }
          const message=`L'enseignant ayant pour id: ${enseignant.id} a été mis à jour `
          res.status(201).json({message,data:enseignant})
      })
  }).catch(error=>{
      const message=`L'enseignant n'a pas pu être modifié. Réessayez dans quelques instants.`
      res.status(500).json({message,data:error})})
}

exports.deleteEnseignant=(req,res)=>{
  const id=req.params.id
  Enseignant.findByPk(id).then(enseignant=>{
      if(enseignant===null){
          const message=`L'enseignant n'existe pas.`
          res.status(404).json({message})
      }
      const message=`L'enseignant ${id} à bien été supprimé`
      return Enseignant.destroy(id).then(res.status(201).json({message,data:enseignant}))
  }).catch(error=>{
      const message=`L'enseignant n'a pas pu etre supprimé. Réessayez dans quelques instants.`
      res.status(500).json({message,data:error})
  })
}