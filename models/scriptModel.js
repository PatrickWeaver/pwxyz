var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var scriptModel = new Schema({
	script: Number,
	chats: Array
});

module.exports = mongoose.model('Script', scriptModel);