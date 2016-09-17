var express = require('express');


var routes = function(Chat){
    var chatRouter = express.Router();

    var chatController = require('../controllers/chatController.js')(Chat)
    chatRouter.route('/')
        .post(chatController.post)
        .get(chatController.get);

    chatRouter.use('/:chatId', function(req,res,next){
        Chat.findById(req.params.chatId, function(err, chat){
            if(err){
                res.status(500).send(err);
            } else if(chat) {
                req.chat = chat;
                next();
            } else {
                res.status(404).send('no chats found');
            }
        });
    });


    chatRouter.route('/:chatId')

        .get(function(req,res){
                var returnChat = req.chat.toJSON();
                res.json(returnChat);
            })

        /*.put(function(req,res){
            req.chat.guest = req.body.guest;
            req.chat.chats = req.body.chats;
            req.chat.save(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(req.chat);
                }
            });
        })*/

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
                            req.chat[p].push(req.body[p][q]);
                        }
                    }
                }
            } else {
                for(var p in req.body){
                    req.chat[p] = req.body[p];
                }
            }

            req.chat.save(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.json(req.chat);
                }
            });
        })

        .delete(function(req,res){
            req.chat.remove(function(err){
                if(err){
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });

        return chatRouter;
};


module.exports = routes;