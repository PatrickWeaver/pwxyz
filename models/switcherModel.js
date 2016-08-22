var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var switcherModel = new Schema({
	fromScripts: Array,
	toScripts: Array,
	keywords: Array 
});

module.exports = mongoose.model('Switcher', switcherModel);