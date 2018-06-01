const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/similar');

let SimilarListingsSchema = mongoose.Schema({
	id: {type: Number, index: {unique: true}},
	title: String,
	picture: String,
  houseType: String,
  beds: Number,
  cost: Number,
  stars: Number,
  ratings: Number,
});

let ListsSchema = mongoose.Schema({
  id: {type: Number, index: {unique: true}},
  name: String,
  liked: Boolean
});

let SimilarListings = mongoose.model('SimilarListings', SimilarListingsSchema);
let Lists = mongoose.model('SimilarListings', SimilarListingsSchema);

const addList = function() {

}

const removeList = function() {

}

const like = function() {

}

const unLike = function() {

}

module.exports.like = like;
module.exports.unLike = unLike;
module.exports.addList = addList;
module.exports.removeList = removeList;