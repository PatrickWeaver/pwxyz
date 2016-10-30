var scriptController = function(Script){

	var post = function(req, res){
		var script = new Script(req.body);

		if (req.body.api_key != process.env.PWXYZ_KEY){
			res.status(400);
			res.send('API Key is required');
		} else {
			if(!req.body.chats){
				res.status(400);
				res.send('Chats are required');
			} else {
				script.save();
				res.status(201);
				res.send(script);
			}
		}
	}

	var get = function(req,res){
		var query = {};
		// What can you search by in the URL?
		if (req.query.special) {
			if (req.query.id) {
				query._id = req.query._id;
			}
			query.special = req.query.special;
		} else if (req.query._id) {
			query._id = req.query._id;
		}
		Script.find(query, function(err, scripts){
			if(err){
				res.status(500).send(err);
			} else {
				var returnScripts = [];
				scripts.forEach(function(element, index, array){
					var newScript = element.toJSON();
					newScript.links = {};
					newScript.links.self = 'http://' + req.headers.host + '/api/scripts/' + newScript._id;
					returnScripts.push(newScript);
				});
				if (!returnScripts){
					res.status(204);
				} else {
					res.json(returnScripts);
				}
				
			}
		});
	}

	return {
		post: post,
		get: get
	}
}

module.exports = scriptController;