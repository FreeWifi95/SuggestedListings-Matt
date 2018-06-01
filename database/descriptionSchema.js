let DescriptionSchema = mongoose.Schema({
	id: {type: Number, index: {unique: true}},
	location: String,
	houseType: String,
	title: String,
	profilePic: String,
	numGuests: Number,
	numBeds: Number,
	numBaths: Number,
	roomType: String,
	numRooms: Number,
	homeHighlights: Array,
	initDescription: String,
	spaceDescription: String,
	guestAccessDescription: String,
	guestInteractionDescription: String,
	otherNotes: String,
	licenseNum: Number,
	ameneties: {
		basicAmeneties: [{amenity: String, description: String}],
		familyFeatures: [{amenity: String, description: String}],
		dining: [{amenity: String, description: String}],
		guestAccess: [{amenity: String, description: String}],
		logistics: [{amenity: String, description: String}],
		bedAndBath: [{amenity: String, description: String}],
		outDoor: [{amenity: String, description: String}],
		safetyFeatures: [{amenity: String, description: String}],
		notIncluded: [{amenity: String, description: String}],
	}
	houseRules: {
		list: [String],
    description: String,
    mustAcknowledge: [String]
	}
	cancellations: {type: String,
	                description: String},
	accessability: String,
	similarListings: [SimilarListingsSchema]
});