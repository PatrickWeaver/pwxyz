start = function() {
	// Runs when the session starts
	console.log("⚙ start()");

	guest_ip = document.getElementById("guest-ip").innerHTML;
	guest_ip = guest_ip.replace(/\n|\r/g, "").replace(/\s|\r/g, "");
	apiGET("guests", [["ip_addresses", guest_ip]]);
		
};


function toTitleCase(e){var t=/^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;return e.replace(/([^\W_]+[^\s-]*) */g,function(e,n,r,i){return r>0&&r+n.length!==i.length&&n.search(t)>-1&&i.charAt(r-2)!==":"&&i.charAt(r-1).search(/[^\s-]/)<0?e.toLowerCase():n.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)})};

window.onload = function(){
	window.setTimeout(start(), 100)

}



var app = angular.module('Chats', []);

app.controller('mainController', function($scope, $http, $timeout, $location, $anchorScroll) {


	$scope.formData = {};

	$scope.chats = [];









	send = function(who, sentMessage) {
		console.log("⚙ send()");
		// Runs when a user inputs a message or when a bot finds a message using getBotMessage()
		console.log("↪️ Sending: '" + sentMessage + "' from " + who)

		time_sent = Date.now();

		// Log chat in API:
		apiPOST(
			JSON.stringify({
				"guest_id": guest_id,
				"guest_ip": guest_ip,
				"chat": [who, sentMessage],
				"time": time_sent

			}), "chats"
		)

		if (who === "bot") {
			user_type = "bot";
		} else {
			user_type = "user";
		}

		// Push to browser
		$scope.chats.push({
			id: count, name: who, user_type: user_type, timestamp: time_sent, message: sentMessage, count: count
		});
		$location.hash('chat-' + count);
		$anchorScroll();

		last_chat = sentMessage;
		count += 1;
	}

	sendToBot = function(parameter) {
		console.log("⚙ sendToBot()");
		// Runs after scriptsOnLoad() processes script API call
		who = "bot";
		wait = 200;
		if (parameter){
			bot_message = parameter;
		} else {
			bot_thought = current_script.chats[script_count];
		}
		tildeSearch(bot_thought, who, wait)
	
	}

	tildeSearch = function(bot_thought, who, wait){
		console.log("⚙ tildeSearch()");
		console.log("* " + tilde_insert);
		tilde_index = bot_thought.indexOf("~");
		if (tilde_index > -1) {
			var ask_if = "";
			for (t in tilde_insert) {
				if (t == tilde_insert.length - 1) {
					if (tilde_insert.length > 2) {
						ask_if += ", or ";
					} else if (tilde_insert.length > 1) {
						ask_if += " or ";
					}
				} else if (t == 1) {
					ask_if += "";
				} else {	
					ask_if += ", ";
				}
				ask_if += tilde_insert[t];
			}
			b_thought1 = bot_thought.substr(0, tilde_index);
			b_thought2 = bot_thought.substr(tilde_index + 1, bot_thought.length);
			bot_thought = b_thought1 + ask_if + b_thought2;
		}
		bot_message = bot_thought;

		$timeout(function() {
			send(who, bot_message)
			script_count += 1;
		}, wait);


	}

	sendFromUser = function(userMessage) {
		if (count > 0) {
			console.log("⚙ sendFromUser()");
			who = guest_name;
			wait = 10;

			saveUserData(userMessage);

			$timeout(function() {
				send(who, userMessage)
				getBotMessage(userMessage);
			}, wait);
		}
	}


	saveUserData = function(data) {
		console.log("⚙ saveUserData()");
		switch(current_script.special) {
			case 1:
				guest_name = data;
				patch_body = {}
				patch_body.name = guest_name;
				apiPATCH(JSON.stringify(patch_body), "guests", guest_id)
				break;
			case 3:
				guest_name = data;
				newGuestWithName();
				break;
			case 4:
				newGuest();
				break;
		}
	}

	getBotMessage = function(userMessage) {
		console.log("⚙ getBotMessage");
		tilde_found = false;
		keyword_found = false;
		script_path = false;
		if (userMessage){
			// Runs when a user inputs a message
			for (t in tilde_insert) {
				if (userMessage == tilde_insert[t]){
					tilde_found = true;
					switch(current_script.special){
						case 8:
							script_path = true;
							alert("guest path");
							apiGET("guests", [["ip_addresses", guest_ip], ["name", guest_name]]);
							break;
					}
				}
				if (tilde_found == true){
					break;
				}
			}

			tilde_insert = [];

			total_wait = 0;
			while(guest_id == ""){
				wait = 500;

				$timeout(function() {
					console.log("waiting . . .");
				}, wait);
				wait += 500;
				if (total_wait > 4000) {
					break;
				}
			}

			for (from_script in keyword_set)	{
					for (to_script in keyword_set[from_script]) {
						if (to_script != current_script._id){
							for(keyword in keyword_set[from_script][to_script]){
								keyword_to_search = keyword_set[from_script][to_script][keyword];
								if (userMessage.toUpperCase().includes(keyword_to_search.toUpperCase())){
									console.log("🔔 keyword found: " + keyword_to_search);
									keyword_found = true;
									if (!persist_keywords) {
										key_to_delete = String(current_script._id)
										console.log("🚫 Delete keywords from: " + key_to_delete);
										delete keyword_set[key_to_delete];
									}
									apiGET("scripts", [["_id", to_script]]);
									break
								} else {
									console.log("🔕 No keyword")
								}
							}
						}
					}
				}
			}
			if (!script_path){
				alert("script path");
				if (!keyword_found){

				if (script_length > script_count) {
					console.log(" || On " + script_count + " of " + script_length + " in script.");
					sendToBot();
				} else {
					if (special != 2) {
						// Go to pre-goodbye or goodbye script
						console.log(" || On " + script_count + " of " + script_length + " in script. I am out of things to say.");
						special = 2;
						apiGET("scripts", [["special", special]]);
					} else {
						doneChatting = true;
						who = "user";
						console.log("else else " + script_count + " of " + script_length + " Special: " + special)
					}
					
				}
			}
		}
	}












});