var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var chatModel = new Schema({
	guest: String,
	chats: Array
});

module.exports = mongoose.model('Chat', chatModel);