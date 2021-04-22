const os = require('os');
const path = require('path')
const fs = require('fs/promises');

const ALPS_DRIVE = path.join(os.tmpdir(), 'api/');
console.log(ALPS_DRIVE);

function createRootFolder() {
    const promise = fs.access(ALPS_DRIVE)
        .then(() => {
            console.log('Dossier existant');
        }).catch(() => {
            return fs.mkdir(ALPS_DRIVE);
        })
    return promise;
}

function listFolder(path) {
    return fs.readdir(path, {withFileTypes: true}).then((result) => {
        const myResult = [];
        result.forEach(element => {
            myResult.push({name: element.name, isFolder: element.isDirectory()})
        })
        return myResult
    }).catch((err) => {
        if (err.code == 'ENOTDIR') {
            console.error(err);
            return fs.readFile(path);
        }
    })
}

function deleteItem(path) {
    return fs.rm(path, {recursive:true}, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log("File terminated");

        listFolder(path);
    })
};

function addItem(path) {
    return fs.mkdir(path);
}

module.exports = {
    createRootFolder: createRootFolder,
    listFolder: listFolder,
    deleteItem: deleteItem,
    addItem: addItem,
    ALPS_DRIVE: ALPS_DRIVE
}