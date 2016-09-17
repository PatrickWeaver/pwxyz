var express = require('express'),
	mongoose = require('mongoose'),
	pug = require('pug'),
	bodyParser = require('body-parser');



var db;

if(process.env.ENV == 'ENV is Test'){
	db = mongoose.connect('mongodb://localhost/pwxyz_test');
} else if(process.env.ENV == 'staging'){
	console.log("ENV is staging");
	db = mongoose.connect(process.env.MONGODB_URI);
} else {
	console.log("ENV is not test or staging, probably dev");
	db = mongoose.connect('mongodb://localhost/pwxyz');
}

var Project = require('./models/projectModel');
var Chat = require('./models/chatModel');
var Script = require('./models/scriptModel');

var app = express();
app.set('view engine', 'pug')
app.set('view options', { pretty: true })


var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

projectRouter = require('./routes/projectRoutes')(Project)
chatRouter = require('./routes/chatRoutes')(Chat)
scriptRouter = require('./routes/scriptRoutes')(Script)

app.use('/api/projects', projectRouter);
app.use('/api/chats', chatRouter);
app.use('/api/scripts', scriptRouter);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/new', function(req, res){
	res.sendFile(__dirname + '/views/new/index.html');
});

app.get('/p', function(req, res){
	var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
	console.log(ip);

	res.render('pugtest', {
	pretty: true,
	
	test: 'kal;sdfjk;aldsf',
	ip: ip,
	pageTitle: 'PugTest',
	youAreUsingPug: true
	
	})
});

app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});

module.exports = app;