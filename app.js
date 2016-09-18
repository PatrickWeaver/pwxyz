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
} else if(process.env.ENV == 'production'){
	console.log("ENV is production");
	db = mongoose.connect(process.env.MONGODB_URI);
} else {
	console.log("ENV is not test, production, or staging, probably dev");
	db = mongoose.connect('mongodb://localhost/pwxyz');
}

// MODELS:
var Project = require('./models/projectModel');
var Chat = require('./models/chatModel');
var Script = require('./models/scriptModel');
var Guest = require('./models/guestModel');

// SET UP EXPRESS
var app = express();
app.set('view engine', 'pug')
app.set('view options', { pretty: true })
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// ROUTES:
// For API:
projectRouter = require('./routes/projectRoutes')(Project)
chatRouter = require('./routes/chatRoutes')(Chat)
scriptRouter = require('./routes/scriptRoutes')(Script)
guestRouter = require('./routes/guestRoutes')(Guest)



// BOT:
bot = require('./bot/bot');

app.use('/api/projects', projectRouter);
app.use('/api/chats', chatRouter);
app.use('/api/scripts', scriptRouter);
app.use('/api/guests', guestRouter);

// For App:
app.get('/', function(req, res){

	startBot(req, res);

});

app.get('/new', function(req, res){
	res.sendFile(__dirname + '/views/new/index.html');
});

app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});

module.exports = app;