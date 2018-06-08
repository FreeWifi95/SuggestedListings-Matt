const mysql = require('mysql');

const connection = mysql.createConnection({ user: 'root', database: 'similar' });

connection.connect(function (err) {});

const findListing = (callback) => {
  connection.query('select * from listings where id in (17, 19, 79)', (err, result) => { callback(result); });
};

const addList = function () {

};

const removeList = function () {

};

const like = function () {

};

const unLike = function () {

};

module.exports.like = like;
module.exports.unLike = unLike;
module.exports.addList = addList;
module.exports.removeList = removeList;
module.exports.findListing = findListing;
