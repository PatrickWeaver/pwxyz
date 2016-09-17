var chatController = function(Chat){

	var post = function(req, res){
		var chat = new Chat(req.body);

		if(!req.body.guest_ip){
			res.status(400);
			bb = [];
			for (i in req.body) {
				bb.push(i + ": " + req.body[i]);
			}
			res.send('Guest IP is required');
		} else {
			chat.save();
			res.status(201);
			res.send(chat);
		}
	}

	var get = function(req,res){
		var query = {};

		if (req.query.guest_id) {
			query.guest_id = req.query.guest_id
		} else if (req.query._id) {
			query._id = req.query._id
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