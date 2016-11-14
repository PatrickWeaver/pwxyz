var http = require('http');
var possible_guests = "";


startBot = function(req, res){
	console.log("I am the bot.");

	var guest_ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  console.log(process.env.PWXYZ_URL);

  var options = {
  	host: process.env.PWXYZ_URL,
  	port: process.env.PORT || 8000,
  	path: "/api/guests/" + process.env.PWXYZ_KEY + "?ip_addresses=" + guest_ip
  };

  console.log("request url: " + options.host + options.path);
  
  http.get(options, function(response) {
  	response.on("data", function(chunk){
  		console.log("CHUNK: " + chunk);
  		possible_guests = String(chunk);

  		res.render('index', {
				pretty: true,

				// Template variables
				guests: possible_guests,
				pageTitle: 'Patrick Weaver!'
			
			});
  	});
  }).on("error", function(e) {
  	console.log("Error: " + e.message);

  	res.render('error', {
				pretty: true,

				// Template variables
				error: e.message
			
			});
  });

  


}


