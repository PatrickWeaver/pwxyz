var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var projectModel = new Schema({
	name: String,
	media: [],
	url: String,
	alias: String,
	collaborators: []
});

module.exports = mongoose.model('Project', projectModel);