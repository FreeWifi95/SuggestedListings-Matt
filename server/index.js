const express = require('express');
const bodyParser = require('body-parser');
const db = require('./../database/index.js');

const app = express();
const port = 3009;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3031');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/:id', express.static('client/dist'));

app.get('/listing/:id', (req, res) => {
  db.findListing((listing) => { res.end(JSON.stringify(listing)); });
});

app.get('/lists/:id', (req, res) => {
  db.getLists((lists) => { res.end(JSON.stringify(lists)); });
});

app.get('/lists2listings/:id', (req, res) => {
  db.getLists2Listings(req.query.listingIds, (lists2listings) => { res.end(JSON.stringify(lists2listings)); });
});

app.get('/like/:id', (req, res) => {
  db.checkLiked(req.query.data, (liked) => { res.end(JSON.stringify(liked)); });
});

app.post('/like', (req, res) => {
  db.toggleLike(req.body.data);
  res.end();
});

app.post('/lists', (req, res) => {
  // console.log('listId', req.body.listId);
  // console.log('listingId', req.body.listingId);
  // console.log('liked', req.body.liked, typeof req.body.liked);
  if (req.body.liked && req.body.liked !== 'false') {
    console.log('remove ran');
    db.removeList(req.body.listId, req.body.listingId);
  } else {
    console.log('add ran');
    db.addList(req.body.listId, req.body.listingId);
  }
  res.end();
});

app.listen(port, () => console.log(`listening on ${port}`));

