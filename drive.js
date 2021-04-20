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
            console.log("Hello world")
            return fs.readFile(path);
        }
    })
}

function deleteItem(item) {
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
}

module.exports = {
    createRootFolder: createRootFolder,
    listFolder: listFolder,
    deleteItem: deleteItem,
    ALPS_DRIVE: ALPS_DRIVE
}