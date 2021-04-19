const os = require('os');
const path = require('path')
const fs = require('fs/promises');
const { Dirent } = require('fs');

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
    }).catch((err) =>{
        if (err.code == 'ENOTDIR'){
            console.log("je suis dans la fonction")
            return fs.readFile(path);
        }
        })
}



module.exports = {
    createRootFolder: createRootFolder,
    listFolder: listFolder,
    ALPS_DRIVE: ALPS_DRIVE
}