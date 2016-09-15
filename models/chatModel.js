var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var chatModel = new Schema({
	guest: String,
	name: Array,
	other_chats: Array,
	chats: Array
});

module.exports = mongoose.model('Chat', chatModel);