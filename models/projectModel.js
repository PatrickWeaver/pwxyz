var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var projectModel = new Schema({
	name: String,
	medium: String,
	url: String,
	alias: String,
	collaborators: []
});

module.exports = mongoose.model('Project', projectModel);