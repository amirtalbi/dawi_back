const user = require('../Models/user')
const {User}=require('../db/sequelize')
const bcrypt = require('bcrypt')

exports.login=(req,res)=>{
    const numero_etudiant=req.params.numero_etudiant
    const password=req.params.password;
    User.findOne({where:{numero_etudiant:numero_etudiant}}).then(user=>{
        if(!user){
            const message=`L'utilisateur demandé n'existe pas`
            res.status(400).json({message})
        }
        bcrypt.compare(password,user.password).then(valide=>{
            if(!valide){
                const message=`Le mot de passe n'est pas valide`
                res.status(401).json({message})
            }
            const message=`L'utilisateur a été récuperé`
            res.status(201).json({message,data:user})
        })
    }).catch(error=>{
        const message=`L'utilisateur n'a pas pu etre récuperé. Réessayez dans quelques instants.`
        res.status(500).json({message,data:error})
    })
  }

exports.getOneUser=(req,res)=>{
  const id=req.params.id
  User.findByPk(id).then(user=>{
      if(user===null){
          const message=`L'utilisateur ${id} n'existe pas`
          res.status(400).json({message,data:error})
      }
      const message=`L'utilisateur ${id} a été récuperé`
      res.status(201).json({message,data:user})
  }).catch(error=>{
      const message=`L'utilisateur ${id} n'a pas pu etre récuperé. Réessayez dans quelques instants.`
      res.status(500).json({message,data:error})
  })
}

exports.getAllUsers=(req,res)=>{
  User.findAll().then(user=>{
      const message="Liste des Users:"
      res.json({message,data:user})
  }).catch(error=>{
      const message=`La liste des Users n'a pas pu être recupérer. Réessayez dans quelques instants.`
      res.status(500).json({message,data:error})
  })
}

exports.newUser=(req,res)=>{
    bcrypt.hash(req.body.password,10).then(
        hashedPassword=>{
            User.create({
                numero:req.body.numero,
                numero_etudiant:req.body.numero_etudiant,
                password:hashedPassword,
                role:req.body.role,
                uid:req.body.uid
            }).then(user=>{
                if(user===null){
                    const message=`L'utilisateur n'est pas créer.`
                    res.status(404).json({message})
                }
                const message=`L'utilisateur a été crée  id:${user.id}`
                res.json({message,data:user})
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

exports.updateUser=(req,res)=>{
  const id=req.params.id
  bcrypt.hash(req.body.password,10).then(
    hashedPassword=>{
        User.update({
            numero:req.body.numero,
            numero_etudiant:req.body.numero_etudiant,
            password:hashedPassword,
            role:req.body.role,
            uid:req.body.uid
        },{where:{id:id}}).then(()=>{
              return User.findByPk(id).then(user=>{
                  if(user.id===null){
                      const message=`L'utilisateur n'existe pas.`
                      res.status(404).json({message})
                  }
                  const message=`L'utilisateur ayant pour id: ${user.id} a été mis à jour `
                  res.status(201).json({message,data:user})
              })
          }).catch(error=>{
              const message=`L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants.`
              res.status(500).json({message,data:error})})
    }
).catch(error=>{
    const message=`Une erreur a été rencontré. Réessayez dans quelques instants.`
    res.status(500).json({message,data:error})
})
  
}

exports.deleteUser=(req,res)=>{
  const id=req.params.id
  User.findByPk(id).then(user=>{
      if(user===null){
          const message=`L'utilisateur n'existe pas.`
          res.status(404).json({message})
      }
      const message=`L'utilisateur ${id} à bien été supprimé`
      return User.destroy(id).then(res.status(201).json({message,data:user}))
  }).catch(error=>{
      const message=`L'utilisateur n'a pas pu etre supprimé. Réessayez dans quelques instants.`
      res.status(500).json({message,data:error})
  })
}