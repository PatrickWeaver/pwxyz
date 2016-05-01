var chatController = function(Chat){

	var post = function(req, res){
		var chat = new Chat(req.body);

		if(!req.body.guest){
			res.status(400);
			res.send('Guest is required');
		} else {

			chat.save();
			res.status(201);
			res.send(chat);
		}
	}

	var get = function(req,res){
		var query = {};

		if (req.query.guest) {
			query.guest = req.query.guest
		}
		Chat.find(query, function(err, chats){
			if(err){
				res.status(500).send(err);
			} else {
				var returnChats = [];
				chats.forEach(function(element, index, array){
					var newChat = element.toJSON();
					newChat.links = {};
					newChat.links.self = 'http://' + req.headers.host + '/api/chats/' + newChat._id;
					returnChats.push(newChat);
				});
				if (!returnChats){
					res.status(204);
				} else {
					res.json(returnChats);
				}
				
			}
		});
	}

	return {
		post: post,
		get: get
	}
}

module.exports = chatController;