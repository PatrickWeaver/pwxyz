var express = require('express');


var routes = function(Switcher){
    var switcherRouter = express.Router();

    var switcherController = require('../controllers/switcherController.js')(Switcher)
    switcherRouter.route('/')
        .post(switcherController.post)
        .get(switcherController.get);

    switcherRouter.use('/:switcherId', function(req,res,next){
        Switcher.findById(req.params.switcherId, function(err, switcher){
            if(err){
                res.status(500).send(err);
            } else if(switcher) {
                req.switcher = switcher;
                next();
            } else {
                res.status(404).send('no switchers found');
            }
        });
    });


    switcherRouter.route('/:switcherId')

        .get(function(req,res){
                var returnSwitcher = req.switcher.toJSON();
                res.json(returnSwitcher);
            })

        .put(function(req,res){
            req.switcher.number = req.body.number;
            req.switcher.chats = req.body.chats;
            req.switcher.save(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(req.switcher);
                }
            });
        })

        .patch(function(req,res){
            if(req.body._id){
                delete req.body._id;
            }
            if(req.body._update_){
                delete req.body._update_;
                for(var p in req.body){
                    //console.log("P: " + p);
                    for(var q in p){
                    //console.log("Q: " + q + " -- " + req.body[p][q]);
                        if(req.body[p][q]){
                            req.switcher[p].push(req.body[p][q]);
                        }
                    }
                }
            } else {
                for(var p in req.body){
                    req.switcher[p] = req.body[p];
                }
            }

            req.switcher.save(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(req.switcher);
                }
            });
        })

        .delete(function(req,res){
            req.switcher.remove(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });

        return switcherRouter;
};


module.exports = routes;