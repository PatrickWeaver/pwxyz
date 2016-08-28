var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var scriptModel = new Schema({
	script: Number,
	name: String,
	special: Number,
	description: String,
	chats: Array,
});

module.exports = mongoose.model('Script', scriptModel);