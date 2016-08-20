var express = require('express');


var routes = function(Script){
    var scriptRouter = express.Router();

    var scriptController = require('../controllers/scriptController.js')(Script)
    scriptRouter.route('/')
        .post(scriptController.post)
        .get(scriptController.get);

    scriptRouter.use('/:scriptId', function(req,res,next){
        Script.findById(req.params.scriptId, function(err, script){
            if(err){
                res.status(500).send(err);
            } else if(script) {
                req.script = script;
                next();
            } else {
                res.status(404).send('no scripts found');
            }
        });
    });


    scriptRouter.route('/:scriptId')

        .get(function(req,res){
                var returnScript = req.script.toJSON();
                res.json(returnScript);
            })

        .put(function(req,res){
            req.script.number = req.body.number;
            req.script.chats = req.body.chats;
            req.script.save(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(req.script);
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
                            req.script[p].push(req.body[p][q]);
                        }
                    }
                }
            } else {
                for(var p in req.body){
                    req.script[p] = req.body[p];
                }
            }

            req.script.save(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(req.script);
                }
            });
        })

        .delete(function(req,res){
            req.script.remove(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });

        return scriptRouter;
};


module.exports = routes;