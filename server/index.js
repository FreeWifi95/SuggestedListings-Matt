const express = require('express');
const db = require('./../database/index.js');

const app = express();

app.use(express.static('client/dist'));

app.post('like', (res ,req) => {

}); 

app.post('list', (res, req) => {
  
})

var port = 3057;
app.listen(port, () => console.log('listening on ' + port));
