//Import des librairies express
const express = require('express');
//Import de drive.js
const drive = require('./drive');


//Déclarations des constantes
const app = express();
const port = 3000

//Charge le fichier frontend
app.use(express.static('frontend'))

//Démarre le serveur
function start() {
    console.log('OK, le serveur est HTTP est lancé')
    app.listen(port, () => {
        console.log(`Listening http://localhost:${port}`)
    })
}

//Routes des APIs
//Liste les fichers sur l'accueil
app.get('/api/drive', function (req, res) {
    drive.listFolder(drive.ALPS_DRIVE).then((result) => {
        res.send(result);
    })
})
//Liste les fichiers dans les fichiers
app.get('/api/drive/:name', function (req, res) {
    drive.listFolder(drive.ALPS_DRIVE + req.params.name).then((result) => {
        res.send(result);
    })
})

//Créer un fichier
app.post('/api/drive', function(req, res) {
    const regex = /^[a-z-0-9_]*$/g.test(req.query.name);
    console.log(regex)
    if(regex) {
        drive.addItem(drive.ALPS_DRIVE + req.query.name).then(() => {
            res.status(201).send();
        }).catch((err)=> {
            console.error(err);
        })
    }
})

//Créer un fichier dans un fichier (non fonctionnelle)
app.post('/api/drive/:folder', function(req, res) {
    //Test des caractères dans le champ input qui correspond à la query :name
    const regex = /[a-z-0-9_]/.test(req.query.name);
    console.log(regex);

    if(regex) {
        drive.addItem(drive.ALPS_DRIVE + req.params.folder + req.query.name).then(() => {
            res.status(201).send();
        }).catch((err)=> {
            console.error(err);
        })
    }

})

//Supprime un fichier
app.delete('/api/drive/:name', function (req, res) {
    drive.deleteItem(drive.ALPS_DRIVE + req.params.name).then(() => {
        res.send();
    })
})

module.exports = {
    start: start,
}
