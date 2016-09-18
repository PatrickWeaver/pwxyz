var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var guestModel = new Schema({
	guest_id: String,
	name: String,
	ip_addresses: Array,
	last_chat: String,
	location: {
		lat: String,
		long: String,
		city: String,
		state: String,
		country: String
	}
	
});

module.exports = mongoose.model('Guest', guestModel);