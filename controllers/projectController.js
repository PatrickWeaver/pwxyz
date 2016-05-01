var projectController = function(Project){

	var post = function(req, res){
		var project = new Project(req.body);

		if(!req.body.name){
			res.status(400);
			res.send('Name is required');
		} else {

			project.save();
			res.status(201);
			res.send(project);
		}
	}

	var get = function(req,res){

		var query = {};

		if (req.query.media) {
			query.media = req.query.media
		}
		Project.find(query, function(err, projects){
			if(err){
				res.status(500).send(err);
			} else {
				var returnProjects = [];
				projects.forEach(function(element, index, array){
					var newProject = element.toJSON();
					newProject.links = {};
					newProject.links.self = 'http://' + req.headers.host + '/api/projects/' + newProject._id;
					returnProjects.push(newProject);
				}); 
				res.json(returnProjects);
			}
		});
	}

	return {
		post: post,
		get: get
	}

}

module.exports = projectController;