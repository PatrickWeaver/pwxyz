var express = require('express');


var routes = function(Project){
	var projectRouter = express.Router();

	var projectController = require('../controllers/projectController.js')(Project)
	projectRouter.route('/')
		.post(projectController.post)
		.get(projectController.get);

	projectRouter.use('/:projectId', function(req,res,next){
		Project.findById(req.params.projectId, function(err, project){
			if(err){
				res.status(500).send(err);
			} else if(project) {
				req.project = project;
				next();
			} else {
				res.status(404).send('no project found');
			}
		});
	});


	projectRouter.route('/:projectId')

		.get(function(req,res){
				var returnProject = req.project.toJSON();

				returnProject.links = {};

				var newLink = 'http://' + req.headers.host + '/api/projects?medium=' + returnProject.medium;
				returnProject.links.filterByThisGenre = newLink.replace(' ', '%20');
				res.json(returnProject);
			})

		.put(function(req,res){
			req.project.name = req.body.name;
			req.project.medium = req.body.medium;
			req.project.url = req.body.url;
			req.project.alias = req.body.alias;
			req.project.collaborators = req.body.collaborators;
			req.project.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(req.project);
				}
			});
		})

		.patch(function(req,res){
			if(req.body._id){
				delete req.body._id;
			}
			for(var p in req.body){
				req.project[p] = req.body[p];
			}

			req.project.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(req.project);
				}
			});
		})

		.delete(function(req,res){
			req.project.remove(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.status(204).send('Removed');
				}
			});
		});

		return projectRouter;
};


module.exports = routes;