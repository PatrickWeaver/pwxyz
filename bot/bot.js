var http = require('http');
var possible_guests = "";
var request = require('request');


startBot = function(req, res){
	console.log("🤖 I am the bot responding to a request!");

	var guest_ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  console.log("📡 Requesting from " + process.env.PWXYZ_URL + " API.");
  console.log("👤 Guest IP Address is: " + guest_ip)

  guestRequest();

  function guestRequest() {

    var options = {
    	hostname: process.env.PWXYZ_URL,
    	port: process.env.PORT || 8000,
    	path: "/api/guests/?ip_addresses=" + guest_ip
    };

    url = "http://" + options.hostname + ":" + options.port + options.path;

    console.log("http://" + "request url: " + options.hostname + options.path);
    
    
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);

        res.render('index', {
          pretty: true,

          // Template variables
          body: body,
          guests: possible_guests,
          pageTitle: 'Patrick Weaver!'
        
        });


      } else if (error) {
        console.log(error);
      } else {
        console.log(response);
        console.log(body);
      }
    });


    
    /*
    http.request(options, function(response) {
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
    */
  }


}


