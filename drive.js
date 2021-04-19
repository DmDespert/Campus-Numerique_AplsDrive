const os = require('os');
const path = require('path')
const fs = require('fs/promises')

const ALPS_DRIVE = path.join(os.tmpdir(), 'test/');
console.log('Mon dossier racine de stockage ; ' + ALPS_DRIVE);

function createRootFolder(){
    const promise = fs.access(ALPS_DRIVE)
    .then(() => {
        console.log('Le dossier exste deja');
    }).catch(() => {
        return fs.mkdir(ALPS_DRIVE);
    })
    return promise
}

function listFolder(path){
 return fs.readdir(path, { withFileTypes: true }).then((result)=>{
    const myResult = [];
    result.forEach(element => {
        myResult.push({name: element.name, isFolder: element.isDirectory()})
    })
    return myResult
    }).catch(() =>
        console.log('Aucun dossier ou fichier trouvé')
    )
    }

module.exports = {
    createRootFolder: createRootFolder,
    listFolder: listFolder,
    ALPS_DRIVE: ALPS_DRIVE
}