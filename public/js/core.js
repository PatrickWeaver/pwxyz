var y = 0;

start = function() {
	// Runs when the session starts
	console.log("⚙ start()");

	guests = document.getElementById("guests").innerHTML;
	guests = JSON.parse(guests);

	number_of_guests = guests.length;
	console.log(number_of_guests + " possible guests:")
	for (g in guests) {
		guest = guests[g];
		console.log(guest + ". Name: " + guest.name + ", Id: " + guest._id);
		possible_guests.push(guest);
		
	}

	findGuestName();
		
};


function toTitleCase(e){var t=/^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;return e.replace(/([^\W_]+[^\s-]*) */g,function(e,n,r,i){return r>0&&r+n.length!==i.length&&n.search(t)>-1&&i.charAt(r-2)!==":"&&i.charAt(r-1).search(/[^\s-]/)<0?e.toLowerCase():n.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)})};

window.onload = function(){
	window.setTimeout(start(), 100)

}


botChat = function() {
	console.log("⚙ botChat()");
	question = false;

	bot_message = current_script.chats[script_count];

	if (bot_message[bot_message.length - 1] === "?") {
		question = true;
	}

	tildeReplace(bot_message).then(function(bot_message) {
	  console.log("✔️ tildeReplace() Resolve: Success");
	  console.log("Script Count: " + script_count + ", of Script Length: " + script_length);
		if (script_count < script_length){
			send("bot", bot_message);
			script_count += 1;
		}
	}).catch(function(error) {
	  console.log("⚙ tildeReplace() Resolve, Error: " + error);
	});

	

}


var tildeReplace = function(bot_message) {
	console.log("⚙ tildeReplace(" + bot_message + ")");
	console.log("Tilde Insert: [" + tilde_insert + "]");
  return new Promise(function(resolve, reject) {
    // this will throw, x does not exist
    if (tilde_insert.type) {
    	switch (tilde_insert.type) {
    		case "project list":
    			for (t in tilde_insert) {
    				tilde_index = bot_message.indexOf("~");
    				if (tilde_index > -1) {
    					test_http = tilde_insert[t].toString();
    					if (test_http.substr(0,4) === "http"){
    						insert = "<a href='" + test_http + "' target='blank'>" + test_http + "</a>";
    					} else {
    						insert = test_http;
    					}



    					bot_message = bot_message.substr(0, tilde_index) + insert + bot_message.substr(tilde_index + 1, bot_message.length);
    				}
    			}
    			break;
    		default:
    			console.log("Error: no tilde_insert type.");
    			break;
    	}
    } else {
	    tilde_index = bot_message.indexOf("~");
			if (tilde_index > -1) {
				insert = "";
				how_many = tilde_insert.length - 1;
				for (t in tilde_insert) {
					insert += tilde_insert[t];
					if (t < how_many - 1) {
						insert += ", "
					} else if (t < how_many) {
						if (t != 0){
							insert += ",";
						}
						insert += " or ";
					}
				}
				bot_message = bot_message.substr(0, tilde_index) + insert + bot_message.substr(tilde_index + 1, bot_message.length);
			}
		}
    resolve(bot_message);
  });
};

saveUserData = function(data) {
	console.log("⚙ saveUserData()");
	switch(special) {
		case 1:
		case 3:
			apiPOST(
			JSON.stringify({
				"ip_addresses": [guest_ip],
				"name": toTitleCase(data)
			}), "guests"
		)
			break;
		case 4:
			newGuest();
			break;
	}
}



var app = angular.module('Chats', []);

app.filter('unsafe', function($sce) {
	    return function(val) {
	        return $sce.trustAsHtml(val);
	    };
	});

app.controller('mainController', function($scope, $http, $timeout, $location, $anchorScroll) {


	$scope.formData = {};

	$scope.chats = [];




	sendFromUser = function(userMessage) {
		if (count >= 0) {
			console.log("⚙ sendFromUser()");
			who = guest_name;
			wait = 10;

			//saveUserData(userMessage);
			send(who, userMessage);


			saveUserData(userMessage);

			$timeout(function() {
				getBotMessage(userMessage);
			}, 100);
		}
	}


	send = function(who, sentMessage) {
		console.log("⚙ send()");
		// Runs when a user inputs a message or when a bot finds a message using getBotMessage()
		console.log("↪️ Sending: '" + sentMessage + "' from " + who);
		time_sent = Date.now();

		last_chat = sentMessage;


		// Log chat in API:
		apiPOST(
			JSON.stringify({
				"guest_id": guest_id,
				"guest_ip": guest_ip,
				"chat": [who, sentMessage],
				"time": time_sent,
				"special": special

			}), "chats"
		)

		if (who === "bot") {
			user_type = "bot";
		} else {
			user_type = "user";
		}

		time = formatDate(time_sent);

		// Push to browser
		$timeout(function() {
			$scope.chats.push({
				id: count, name: who, user_type: user_type, u_time: time_sent, time: time, message: sentMessage, count: count, special: special
			});
			$location.hash('chat-' + count);
			$anchorScroll();

			last_chat = sentMessage;
			count += 1;
		}, 50);

		
	}



	getBotMessage = function(userMessage) {
		console.log("⚙ getBotMessage");

		tilde_found = "";
		keyword_found = false;

		if (userMessage) {
			console.log("🔍 Checking for script keywords.");
			for (from_script in keyword_set)	{
				for (to_script in keyword_set[from_script]) {
					if (to_script != current_script._id){
						for(keyword in keyword_set[from_script][to_script]){
							keyword_to_search = keyword_set[from_script][to_script][keyword];
							if (userMessage.toUpperCase().includes(keyword_to_search.toUpperCase())){
								console.log("🔔 keyword found: " + keyword_to_search);
								keyword_found = true;
								break
							} else {
								console.log("🔕 No keyword")
							}
						}
					}
				}
			}
			if (keyword_found){
				switch (special) {
					case 5:
					case 11: 
					apiGET("projects");
					break;
				default:
					apiGET("scripts", [["_id", to_script]]);
				}
				return;
			}

			console.log("🔍 Checking for tilde keywords.");
			for (t in tilde_insert) {
				keyword_to_search = tilde_insert[t].toString();
				if (userMessage.toUpperCase().includes(keyword_to_search.toUpperCase())){
					console.log("🔔 tilde keyword found: " + keyword_to_search);
					tilde_found = keyword_to_search;
					break;
				}
				if (tilde_insert.length === 1){
					if (question){
						console.log("🔍 Checking for yes keywords.");
						for (y in yes){
							if (userMessage.toUpperCase().includes(yes[y].toUpperCase())){
								console.log("🔔 yes keyword found: " + keyword_to_search);
								tilde_found = keyword_to_search;
								break;
							}
						}
					}
				}
			}
			tilde_insert = [];

			if (!keyword_found && tilde_found != "") {
				switch (special) {
					case 2:
						if (!guest_id){
							for (guest in possible_guests) {
								if (possible_guests[guest].name === tilde_found){
									guest_name = possible_guests[guest].name;
									guest_id = possible_guests[guest].id;
									break;
								}
							}
							tilde_insert = [guest_name];
						}

						botChat();
						break;
					case 8:
						apiGET("projects", [["name", tilde_found]]);
						break;
					case 10:
						apiGET("projects", [["media", tilde_found]]);
						break;
					default:
							break;
				}
			} else {
				if (script_count >= script_length) {
					console.log("Script done, getting new script. Special: " + special);
					switch (special) {
						case 2:
							special = 5;
							apiGET("scripts", [["special", special]]);
							break;
						case 3:
							special = 11;
							apiGET("scripts", [["special", special]]);
							break;
						case 5:
						case 11:
							apiGET("projects", [["media", userMessage.toLowerCase()]]);
							break;
						default:
							special = 5;
							apiGET("scripts", [["special", special]]);
							break;
					}
				} else {
					botChat();
				}
			}
		}	
	}
});


