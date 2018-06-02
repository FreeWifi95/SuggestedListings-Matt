const express = require('express');
const db = require('./../database/index.js');

const app = express();

app.use(express.static('client/dist'));

app.get('/list', (req, res) => {
  db.findListing((listing) => { res.end(listing); });
});

app.post('like', (req, res) => {
  res.end();
});

app.post('list', (req, res) => {
  res.end();
});

const port = 3009;
app.listen(port, () => console.log(`listening on ${port}`));
