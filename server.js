console.log('hello la famille je suis le server')
let express = require('express');
const os = require('os')
const fs = require('fs');
const drive = require('./drive');
const { fileURLToPath } = require('url');

let app = express();
let port = 3000
let alps_drive = os.tmpdir() + ''

app.use(express.static('frontend'))

function start(){
  console.log('OK, le serveur est HTTP est lancé')
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
}


///////////////////////////////////////////////////////

app.get('/api/drive', function (req, res){
  drive.listFolder(drive.ALPS_DRIVE).then((result) => {
    res.send(result);
  })
})

////////////////////////////////////////////////////// 

app.get('/api/drive/:name', function (req, res) {
 drive.listFolder(drive.ALPS_DRIVE + req.params.name).then((result) =>{
   res.send(result);
 })
})

///////////////////////////////////////////////////////




module.exports = {
  start : start,
}
