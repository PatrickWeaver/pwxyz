var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var projectModel = new Schema({
	name: String,
	media: Array,
	url: String,
	alias: String,
	collaborators: Array
});

module.exports = mongoose.model('Project', projectModel);