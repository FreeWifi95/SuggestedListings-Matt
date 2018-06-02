const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/similar');

let ListingSchema = mongoose.Schema({
  id: {type: Number, index: {unique: true}},
  title: String,
  picture: String,
  houseType: String,
  beds: Number,
  cost: Number,
  stars: Number,
  ratings: Number,
  ListSchema: [Number]
});

let ListSchema = mongoose.Schema({
  id: {type: Number, index: {unique: true}},
  name: String,
  liked: Boolean
});

let Listing = mongoose.model('Listing', ListingSchema);
let List = mongoose.model('List', ListSchema);

const findListing = function(id, callback) {
  Listing.find((err, listing) => {console.log(listing)})
}

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
module.exports.findListing = findListing;