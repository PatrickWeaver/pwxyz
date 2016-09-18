var app = angular.module('Chats', []);
var count  = 0;
var script_count = 0;
var special = 1;
var doneChatting = false;
var keyword_set = {};
var persist_keywords = false;

var current_script;
var script_length;

var guest_id = "";
console.log(guest_id);

var tilde_insert = [];

app.controller('mainController', function($scope, $http, $timeout, $location, $anchorScroll) {
	$scope.formData = {};

	$scope.chats = [];

	send = function(who, sentMessage) {
		console.log("⚙ send()");
		// Runs when a user inputs a message or when a bot finds a message using getBotMessage()
		console.log("sending: '" + sentMessage + "' from " + who)

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

		count += 1;
	}


	sendFromUser = function(userMessage) {
		if (count > 0) {
			console.log("⚙ sendFromUser()");
			if (guest_name == "" && count == 1) {
				guest_name = toTitleCase(userMessage);
			}
			who = guest_name;
			wait = 10;

			$timeout(function() {
				send(who, userMessage)
				if (unknown_guest) {
					findGuest(guest_name, guest_ip);
				} else { 
					getBotMessage(userMessage);
				}
			}, wait);
		}
	}



	getBotMessage = function(userMessage) {
		console.log("⚙ getBotMessage");
		// Runs when a user inputs a message
		keyword_found = false;


		for (from_chat_script in keyword_set)	{
				for (to_chat in keyword_set[from_chat_script]) {
					for(keyword in keyword_set[from_chat_script][to_chat]){
						if (to_chat != current_script._id){
							keyword_to_search = keyword_set[from_chat_script][to_chat][keyword];
							if (userMessage.toUpperCase().includes(keyword_to_search.toUpperCase())){
								console.log("@ keyword found: " + keyword_to_search);
								keyword_found = true;
								if (!persist_keywords) {
									key_to_delete = String(current_script._id)
									console.log("** delete keywords from: " + key_to_delete);
									delete keyword_set[key_to_delete];
								}
								apiGET("scripts", "_id", to_chat);
								break
							} else {
								console.log("@ no keyword")
							}
						}
					}
				}
		}

		if (!keyword_found){

			if (script_length > script_count) {
				console.log(" || On " + script_count + " of " + script_length + " in script.");
				sendToBot();
			} else {
				if (special != 2) {
					// Go to pre-goodbye or goodbye script
					console.log(" || On " + script_count + " of " + script_length + " in script. I am out of things to say.");
					script_count = 0;
					special = 2; // Set special to 2 to start Goodbye script
					// Need to prevent goodbye loop, or store the special in a variable?
					apiGET("scripts", "special", special)
				} else {
					doneChatting = true;
					who = "user";
					console.log("else else " + script_count + " of " + script_length + " Special: " + special)
				}
				
			}
		}

	}


	sendToBot = function(parameter) {
		console.log("⚙ sendToBot()");
		// Runs when an api call returns a response
		who = "bot";
		wait = 200;
		if (parameter){
			bot_message = parameter;
		} else {
			bot_thought = current_script.chats[script_count];
			tilde_index = bot_thought.indexOf("~");
			if (tilde_index > -1) {
				bot_message = bot_thought.substr(0, tilde_index) + tilde_insert[0] + bot_thought.substr(tilde_index + 1, bot_thought.length);
			} else {
				bot_message = bot_thought;
			}
		}
		$timeout(function() {
			send(who, bot_message)
			script_count += 1;
		}, wait);
		
	}







});
