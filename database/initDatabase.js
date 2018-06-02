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

var listingOne = new Listing({
	id: 1,
	title: 'The Cozy Palace',
	picture: 'https://imgur.com/gallery/TaFV6',
	houseType: 'Private Room',
	beds: 1,
	cost: 110,
	stars: 5,
	ratings: 312,
	listSchema: [1, 2, 3,]
});

listingOne.save((err, listing) => {});


var listOne = new List({
	id: 1,
	name: 'Vacations',
	liked: false
})

var listTwo = new List({
	id: 2,
	name: 'Mountain Getaways',
	liked: false
})

var listThree = new List({
	id: 3,
	name: 'Dream Homes',
	liked: false
})

