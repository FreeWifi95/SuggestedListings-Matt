const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect(function (err) {});

const findListing = (callback) => {
  connection.query('select * from listings where id in (10, 44, 79, 88, 102, 130, 133, 137, 143, 145, 157, 159)', (err, result) => { callback(result); });
};

const getLists = (callback) => {
  connection.query('select * from lists;', (err, result) => { callback(result); });
};

const addList = function (listingId, listId) {
  connection.query('insert into lists2listings values (' + listId + ', ' + listingId + ');', (err, result) => { });
};

const removeList = function (listId, listingId) {
  connection.query('delete from lists2listings where listId = ' + listId + ' and listingId = ' + listingId + ';', (err, result) => { });
};

const checkLiked = (id, callback) => {
  connection.query('select liked from listings where id = ' + id + ';', (err, result) => { if (err) {
    console.log(err);
  } else {callback(result[0].liked); }});
};

const toggleLike = (id) => {
  connection.query('update listings set liked = !liked where id = ' + id + ';', (err, result) => { });
};

const getLists2Listings = (listingIds, callback) => {
  // console.log(listingIds);
  const idString = listingIds.join(', ');
  connection.query('select * from lists2listings where listingId in (' + idString + ');', (err, result) => { callback(result); });
};

module.exports.toggleLike = toggleLike;
module.exports.checkLiked = checkLiked;
module.exports.getLists = getLists;
module.exports.addList = addList;
module.exports.removeList = removeList;
module.exports.findListing = findListing;
module.exports.getLists2Listings = getLists2Listings;
