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

    url = "http://" + options.hostname + options.path;

    console.log("⬆️ " + url);
    
    
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resp = JSON.parse(body);

        console.log("⬇️ Response: " + body);

        for (guest in resp) {
          console.log("👤 "  + guest + ": " + resp[guest].name);
        }

        res.render('index', {
          pretty: true,

          // Template variables
          guests: body,
          guest_ip: guest_ip,
          pageTitle: 'Patrick Weaver!'
        
        });


      } else if (error) {
        console.log("ERROR: " + error);
          res.render('index', {
            pretty: true,

            // Template variables
            guest_ip: guest_ip,
            pageTitle: 'Patrick Weaver!'
          
          });
      } else {
        console.log("RESPONSE: " + response);
        console.log("BODY : " + body);
        res.render('index', {
          pretty: true,

          // Template variables
          guest_ip: guest_ip,
          pageTitle: 'Patrick Weaver!'
        
        });
      }
    });
  }
}


