var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var scriptModel = new Schema({
	special: Number,
	type: String,
	description: String,
	chats: Array,
	keywords: Object
});

module.exports = mongoose.model('Script', scriptModel);