var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');


var db;

if(process.env.ENV == 'Test'){
	db = mongoose.connect('mongodb://localhost/pwxyz_test');
	console.log("Not Test");
} else {
	db = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pwxyz');
}

var Project = require('./models/projectModel');


var app = express();


var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

projectRouter = require('./routes/projectRoutes')(Project);



app.use('/api/projects', projectRouter)

app.get('/', function(req, res){
	res.send('Patrick Weaver');
});

app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});

module.exports = app;