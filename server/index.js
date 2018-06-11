const express = require('express');
const bodyParser = require('body-parser');
const db = require('./../database/index.js');

const app = express();
const port = 3009;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client/dist'));

app.get('/list', (req, res) => {
  db.findListing((listing) => { res.end(JSON.stringify(listing)); });
});

app.get('/like', (req, res) => {
  db.checkLiked(req.query.data, (liked) => { res.end(JSON.stringify(liked)); });
});

app.post('/like', (req, res) => {
  db.toggleLike(req.body.data);
  res.end();
});

app.listen(port, () => console.log(`listening on ${port}`));
