var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var chatModel = new Schema({
	guest_id: String,
	guest_ip: String,
	chat: Array,
	time: String,
	special: String
});

module.exports = mongoose.model('Chat', chatModel);