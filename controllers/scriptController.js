var scriptController = function(Script){

	var post = function(req, res){
		var script = new Script(req.body);

		if(!req.body.script){
			res.status(400);
			res.send('Script number is required');
		} else {

			script.save();
			res.status(201);
			res.send(script);
		}
	}

	var get = function(req,res){
		var query = {};

		if (req.query.script) {
			query.script = req.query.script
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