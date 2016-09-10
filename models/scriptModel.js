var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var scriptModel = new Schema({
	name: String,
	special: Number,
	description: String,
	chats: Array,
	keywords: Array
});

module.exports = mongoose.model('Script', scriptModel);