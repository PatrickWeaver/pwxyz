var express = require('express');


var routes = function(Guest){
	var guestRouter = express.Router();

	var guestController = require('../controllers/guestController.js')(Guest)
	guestRouter.route('/')
		.post(guestController.post)
		.get(guestController.get);

	guestRouter.use('/:guestId', function(req,res,next){
		Guest.findById(req.params.guestId, function(err, guest){
			if(err){
				res.status(500).send(err);
			} else if(guest) {
				req.guest = guest;
				next();
			} else {
				res.status(404).send('no guest found');
			}
		});
	});


	guestRouter.route('/:guestId')

		.get(function(req,res){
				var returnGuest = req.guest.toJSON();
				res.json(returnGuest);
			})

		/*.put(function(req,res){
			// For all:
			req.guest.name = req.body.name;
			req.guest.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(req.project);
				}
			});
		})*/

		.patch(function(req,res){
			if(req.body._id){
				delete req.body._id;
			}
			for(var p in req.body){
				req.guest[p] = req.body[p];
			}

			req.guest.save(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.json(req.guest);
				}
			});
		})

		.delete(function(req,res){
			req.guest.remove(function(err){
				if(err){
					res.status(500).send(err);
				} else {
					res.status(204).send('Removed');
				}
			});
		});

		return guestRouter;
};


module.exports = routes;