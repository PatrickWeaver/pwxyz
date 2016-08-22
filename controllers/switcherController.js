var switcherController = function(Switcher){

	var post = function(req, res){
		var switcher = new Switcher(req.body);

		if(!req.body.fromScripts || !req.body.toScripts){
			res.status(400);
			res.send('To and from scripts are required');
		} else {

			switcher.save();
			res.status(201);
			res.send(switcher);
		}
	}

	var get = function(req,res){
		var query = {};

		if (req.query.switcher) {
			query.switcher = req.query.switcher
		}
		Switcher.find(query, function(err, switchers){
			if(err){
				res.status(500).send(err);
			} else {
				var returnSwitchers = [];
				switchers.forEach(function(element, index, array){
					var newSwitcher = element.toJSON();
					newSwitcher.links = {};
					newSwitcher.links.self = 'http://' + req.headers.host + '/api/switchers/' + newSwitcher._id;
					returnSwitchers.push(newSwitcher);
				});
				if (!returnSwitchers){
					res.status(204);
				} else {
					res.json(returnSwitchers);
				}
				
			}
		});
	}

	return {
		post: post,
		get: get
	}
}

module.exports = switcherController;