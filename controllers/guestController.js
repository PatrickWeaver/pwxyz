var guestController = function(Guest){

	var post = function(req, res){
		var guest = new Guest(req.body);

		if(!req.body.ip_addresses){
			res.status(400);
			res.send('Guest IP is required');
		} else {
			guest.save();
			res.status(201);
			res.send(guest);
		}
	}

	var get = function(req,res){
		var query = {};
		console.log(req.query);
		if (req.query.type == "find") {
			console.log("find a guest!!");
			if (req.query.guest_name) {
				query.name = req.query.guest_name;
				if (req.query.guest_ip) {
					query.ip_addresses = req.query.guest_ip;
				}
			}
			console.log(query);
			findAGuest(query, req, res);
		} else {

			console.log("regular get");




			if (req.query.ip_addresses) {
				query.ip_addresses = req.query.ip_addresses
			} else if (req.query.guest_id) {
				query.guest_id = req.query.guest_id
			} else if (req.query._id) {
				query._id = req.query._id
			} else if (req.query.names) {
				query.names = req.query.names
			}

			console.log(query);

			Guest.find(query, function(err, guests){
				if(err){
					res.status(500).send(err);
					console.log("500 Error");
				} else {
					console.log("no error?");
					var returnGuests = [];
					guests.forEach(function(element, index, array){
						var newGuest = element.toJSON();
						newGuest.links = {};
						newGuest.links.self = 'http://' + req.headers.host + '/api/guests/' + newGuest._id;
						returnGuests.push(newGuest);
					});
					if (!returnGuests){
						res.status(204);
					} else {
						res.json(returnGuests);
					}
					
				}
			});
		}
	}

	findAGuest = function(query, req, res) {
		console.log(query);
		Guest.find(query, function(err, guests){
			if(err){
				res.status(500).send(err);
				console.log("500 Error");
			} else {
				console.log("no error?");
				var returnGuests = [];
				guests.forEach(function(element, index, array){
					var newGuest = element.toJSON();
					newGuest.links = {};
					newGuest.links.self = 'http://' + req.headers.host + '/api/guests/' + newGuest._id;
					returnGuests.push(newGuest);
				});
				if (!returnGuests){
					res.status(204);
				} else {
					if (returnGuests.length === 0) {
						// Post a new guest
					} else if (returnGuests.length === 1) {
						res.json(returnGuests);
					} else if (returnGuests.length > 1) {
						// Send back a question
					}
					
				}
				
			}
		});
	}


	return {
		post: post,
		get: get,
		}
}

module.exports = guestController;