const { MongoClient } = require('mongodb');
const express = require('express');


const app = express()
const port = 3000



// we'll add code here soon
const uri = "mongodb+srv://user-dlsignatures:user-dlsignatures@dl-signatures.vsw9ugp.mongodb.net/?retryWrites=true&w=majority";
//connexion du client a la base de donnée mongoDB
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = client.db("dl-signatures")
var collection = db.collection('clients')
/*
const getCollection = async() => {
   const result = db.listCollections().toArray();
    return result
}


const getCollectionvalue = async() => {
   const result = db.collection('clients').findOne( {mail : "test@gmail.com"})
    return result
}
*/

app.get("/connexion", async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    var User = await db.collection('clients').findOne({ mail: req.query.email, password: req.query.password })

    if (User == null) {
        res.json({ connexion: "non", User })
    }
    else {
        res.header("Access-Control-Allow-Origin", "*");

        res.json({ connexion: "oui", User })
    }

})


app.get("/inscription", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var nbClient = await db.collection('clients').count()

    db.collection("clients").insertOne({
        idClients: nbClient + 1,
        nom: "CASTARD3",
        prenom: "lulu",
        mail: "root2@gmail.com",
        password: "lhukas",
        domaine: "CASTARD.fr",
    })
    res.send("super")
})


app.get("/updateClient", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

   await db.collection("clients").updateOne(
        { idClients : parseInt(req.query.idClients) }, { $set: { 
        'nom': req.query.nom, 
        'prenom' : req.query.prenom,
        'mail' : req.query.mail,
        'telephone' : req.query.telephone,} }
    )
    var User = await db.collection('clients').findOne({ idClients : parseInt(req.query.idClients) })
    res.send(User)
})


app.get("/modele", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var listModeleUser = await db.collection("modele").find({ idClients: parseInt(req.query.IDuser) }).toArray()
    res.json(listModeleUser)
})


app.get("/signature", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var listSignatureUser = await db.collection("signatures").find({ idClients: parseInt(req.query.IDuser) }).toArray()
    res.json(listSignatureUser)
})


app.get("/saveSignature", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var nbSignature = await db.collection("signatures").find({ idClients: 1 }).count()


    db.collection("signatures").insertOne({
        "idClients": parseInt(req.query.idClients),
        "IDmodele": parseInt(req.query.IDmodele),
        "IDsignature": nbSignature+1,
        "champs4": "0:0",
        "champs5": "0:0",
        "nomComplet": req.query.nomComplet,
        "poste": req.query.poste,
        "site": req.query.site
    })
    res.send("ok")
})


app.get("/updatePassword", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    var User = await db.collection('clients').findOne({ idClients : parseInt(req.query.idClients) })
    if(User.password == req.query.oldPassword){
        await db.collection("clients").updateOne({ idClients: parseInt(req.query.idClients) }, { $set: { password: req.query.newPassword } })
        res.send("ok")
    }
    else{
        res.send("error")
    }

})
app.listen(3001, function () {



})