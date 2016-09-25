var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var scriptModel = new Schema({
	special: Number,
	type: String,
	description: String,
	chats: Array,
	keywords: Object,
	persist_keywords: { type: Boolean, default: false }
});

module.exports = mongoose.model('Script', scriptModel);