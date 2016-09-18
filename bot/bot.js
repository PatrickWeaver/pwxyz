startBot = function(req, res){
	console.log("I am the bot.");

	var guest_ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

    res.render('index', {
		pretty: true,

		// Template variables
		guest_ip: guest_ip,
		pageTitle: 'Patrick Weaver!'
	
	});


}


