console.log('hello la famille je suis le server')
var express = require('express');
var app = express();
let port = 3000

app.use(express.static('frontend'))


/*app.get('/', (req, res) => {
    res.send('./frontend/index.html')
  })
  
 */
 
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

