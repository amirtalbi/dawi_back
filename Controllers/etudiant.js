// const etudiant = require('../Models/etudiant')
// const user = require('../Models/user')
const {Etudiant,User}=require('../db/sequelize')
const bcrypt = require('bcrypt')

exports.getOneEtudiant=(req,res)=>{
    const id=req.params.id
    Etudiant.findByPk(id).then(etudiant=>{
        if(etudiant===null){
            const message=`L'étudiant ${id} n'existe pas`
            res.status(400).json({message,data:error})
        }
        const message=`L'étudiant ${id} a été récuperé`
        res.status(201).json({message,data:etudiant})
    }).catch(error=>{
        const message=`L'étudiant ${id} n'a pas pu etre récuperé. Réessayez dans quelques instants.`
        res.status(500).json({message,data:error})
    })
}

exports.getAllEtudiants=(req,res)=>{
    Etudiant.findAll().then(etudiant=>{
        const message="Liste des Etudiants:"
        res.json({message,data:etudiant})
    }).catch(error=>{
        const message=`La liste des Etudiants n'a pas pu être recupérer. Réessayez dans quelques instants.`
        res.status(500).json({message,data:error})
    })
}

exports.newEtudiant=(req,res)=>{
    bcrypt.hash(req.body.password,10).then(
        hashedPassword=>{
            User.create({
                numero:req.body.numero,
                numero_etudiant:req.body.numero_etudiant,
                password:hashedPassword,
                role:req.body.role
            }).then(user=>{
                if(user===null){
                    const message=`L'utilisateur n'est pas créer.`
                    res.status(404).json({message})
                }
                Etudiant.create(
                    {nom:req.body.nom,
                        prenom:req.body.prenom,
                        date_naissance:req.body.date_naissance,
                        promotion:req.body.promotion,
                        email:req.body.email,
                        telephone:req.body.telephone}
                    ).then(etudiant=>{
                    if(etudiant===null){
                        const message=`L'etudiant n'est pas créer.`
                        res.status(404).json({message})
                    }
                    uid=etudiant.id
                    User.update({uid},{where:{id:user.id}}).then(_=>{
                        const message=`L'etudiant a été crée  id:${etudiant.id}`
                        res.json({message,data:etudiant})
                    })
                }).catch(error=>{
                    const message=`L'etudiant n'a pas pu être créer. Réessayez dans quelques instants.`
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

exports.updateEtudiant=(req,res)=>{
    const id=req.params.id
    Etudiant.update(req.body,{where:{id:id}}).then(()=>{
        return Etudiant.findByPk(id).then(etudiant=>{
            if(etudiant.id===null){
                const message=`L'étudiant n'existe pas.`
                res.status(404).json({message})
            }
            const message=`L'étudiant ayant pour id: ${etudiant.id} a été mis à jour `
            res.status(201).json({message,data:etudiant})
        })
    }).catch(error=>{
        const message=`L'étudiant n'a pas pu être modifié. Réessayez dans quelques instants.`
        res.status(500).json({message,data:error})})
}

exports.deleteEtudiant=(req,res)=>{
    const id=req.params.id
    Etudiant.findByPk(id).then(etudiant=>{
        if(etudiant===null){
            const message=`L'étudiant n'existe pas.`
            res.status(404).json({message})
        }
        const message=`L'étudiant ${id} à bien été supprimé`
        return Etudiant.destroy(id).then(res.status(201).json({message,data:etudiant}))
    }).catch(error=>{
        const message=`L'étudiant n'a pas pu etre supprimé. Réessayez dans quelques instants.`
        res.status(500).json({message,data:error})
    })
}