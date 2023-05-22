const express = require('express');


const app = express()
const port = 3000




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


app.listen(3001, function () {



})