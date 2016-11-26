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

		for (q in req.query) {
			console.log("QUERY " + q + ": " + req.query[q]);
		}

		if (req.query.ip_addresses) {
			query.ip_addresses = req.query.ip_addresses;
			if (req.query.name) {
				query.name = req.query.name;
			}
		} else if (req.query.guest_id) {
			query.guest_id = req.query.guest_id
		} else if (req.query._id) {
			query._id = req.query._id
		}

		console.log(query);

		Guest.find(query, function(err, guests){
			if(err){
				res.status(500).send(err);
				console.log("500 Error");
			} else {
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

	findAGuest = function(query, req, res) {
		Guest.find(query, function(err, guests){
			if(err){
				res.status(500).send(err);
				console.log("500 Error");
			} else {
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