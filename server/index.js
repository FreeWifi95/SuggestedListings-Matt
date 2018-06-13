const express = require('express');
const bodyParser = require('body-parser');
const db = require('./../database/index.js');

const app = express();
const port = 3009;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client/dist'));

app.get('/listing', (req, res) => {
  db.findListing((listing) => { res.end(JSON.stringify(listing)); });
});

app.get('/lists', (req, res) => {
  db.getLists((lists) => { res.end(JSON.stringify(lists)); });
});

app.post('/lists', (req, res) => {
  if (req.body.liked) {
    db.removeList(req.body.listId, req.body.listingId);
  } else {
    db.addList(req.body.listId, req.body.listingId);
  }
  res.end();
});

app.get('/lists2listings', (req, res) => {
  db.getLists2Listings(req.query.listingIds, (lists2listings) => { res.end(JSON.stringify(lists2listings)); });
});

app.get('/like', (req, res) => {
  db.checkLiked(req.query.data, (liked) => { res.end(JSON.stringify(liked)); });
});

app.post('/like', (req, res) => {
  db.toggleLike(req.body.data);
  res.end();
});

app.listen(port, () => console.log(`listening on ${port}`));
