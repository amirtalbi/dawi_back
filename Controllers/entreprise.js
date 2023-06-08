// const entreprise = require('../Models/entreprise')
const {Entreprise,User}=require('../db/sequelize')
const bcrypt = require('bcrypt')

exports.getOneEntreprise=(req,res)=>{
  const id=req.params.id
  Entreprise.findByPk(id).then(entreprise=>{
      if(entreprise===null){
          const message=`L'entreprise ${id} n'existe pas`
          return res.status(400).json({message,data:error})
      }else{
        const message=`L'entreprise ${id} a été récuperé`
        return res.status(201).json({message,data:entreprise})
      }
  }).catch(error=>{
      const message=`L'entreprise ${id} n'a pas pu etre récuperé. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}

exports.getAllEntreprises=(req,res)=>{
  Entreprise.findAll().then(entreprise=>{
      const message="Liste des Entreprises:"
      return res.json({message,data:entreprise})
  }).catch(error=>{
      const message=`La liste des Entreprises n'a pas pu être recupérer. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}

exports.newEntreprise=(req,res)=>{
    bcrypt.hash(req.body.password,10).then(
        hashedPassword=>{
            User.create({
                numero:req.body.numero,
                numero_etudiant:req.body.numero_etudiant,
                password:hashedPassword,
                role:"entreprise"
            }).then(user=>{
                if(user===null){
                    const message=`L'utilisateur n'est pas créer.`
                    return res.status(404).json({message})
                }
                Entreprise.create(
                    {nom:req.body.nom,
                        logo:req.body.logo,
                        adresse:req.body.adresse,
                        ville:req.body.ville,
                        pays:req.body.pays,
                        email:req.body.email}
                    ).then(entreprise=>{
                    if(entreprise===null){
                        const message=`L'entreprise n'est pas créer.`
                        return res.status(404).json({message})
                    }
                    iud=entreprise.id
                    User.update(iud,{where:{id:user.id}}).then(_=>{
                        const message=`L'entreprise a été crée  id:${entreprise.id}`
                        return res.json({message,data:entreprise})
                    })
                }).catch(error=>{
                    const message=`L'entreprise n'a pas pu être créer. Réessayez dans quelques instants.`
                    return res.status(500).json({message,data:error})
            })
            }).catch(error=>{
                const message=`L'utilisateur n'a pas pu être créer. Réessayez dans quelques instants.`
                return res.status(501).json({message,data:error})
          })
        }
    ).catch(error=>{
        const message=`Une erreur a été rencontré. Réessayez dans quelques instants.`
        return res.status(500).json({message,data:error})
  })
}

exports.updateEntreprise=(req,res)=>{
  const id=req.params.id
  Entreprise.update({nom:req.body.nom,
    logo:req.body.logo,
    adresse:req.body.adresse,
    ville:req.body.ville,
    pays:req.body.pays,
    email:req.body.email},{where:{id:id}}).then(()=>{
      return Entreprise.findByPk(id).then(entreprise=>{
            if(!req.body.password){
                bcrypt.hash(req.body.password,10).then(
                    hashedPassword=>{
                        User.update({password:hashedPassword},{where:{id:entreprise.uid}})
                    })
            }
          if(entreprise.id===null){
              const message=`L'entreprise n'existe pas.`
              return res.status(404).json({message})
          }else{
            const message=`L'entreprise ayant pour id: ${entreprise.id} a été mis à jour `
            return res.status(201).json({message,data:entreprise})
          }

      })
  }).catch(error=>{
      const message=`L'entreprise n'a pas pu être modifié. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})})
}

exports.deleteEntreprise=(req,res)=>{
  const id=req.params.id
  Entreprise.findByPk(id).then(entreprise=>{
      if(entreprise===null){
          const message=`L'entreprise n'existe pas.`
          return res.status(404).json({message})
      }
      else{
        const message=`L'entreprise ${id} à bien été supprimé`
        return Entreprise.destroy({ where: { id } }).then(res.status(201).json({message,data:entreprise}))
      }
  }).catch(error=>{
      const message=`L'entreprise n'a pas pu etre supprimé. Réessayez dans quelques instants.`
      return res.status(500).json({message,data:error})
  })
}