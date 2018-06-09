const mysql = require('mysql');

const connection = mysql.createConnection({ user: 'root', database: 'similar' });

connection.connect(function (err) {});

const findListing = (callback) => {
  connection.query('select * from listings where id in (10, 44, 79, 88, 102, 130, 132, 137, 143, 146, 157, 159)', (err, result) => { callback(result); });
};

const addList = function () {

};

const removeList = function () {

};

const toggleLike = function (id) {
  console.log('test ', id);
  connection.query('update listings set liked = !liked where id = ' + id + ';', (err, result) => { });
};

module.exports.toggleLike = toggleLike;
module.exports.addList = addList;
module.exports.removeList = removeList;
module.exports.findListing = findListing;
