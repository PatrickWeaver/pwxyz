var app = angular.module('Chats', []);

app.controller('mainController', function($scope, $http, $timeout, $location, $anchorScroll) {
	
	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Variables:	

	$scope.formData = {};

	$scope.chats = [];


	var count = 0;
	var doneChatting = false;
	var keyword_set = {};
	var tilde_insert = [];

	// Script
	var current_script;
	var special;
	var script_count = 0;
	var script_length;


	var last_chat;

	// Guest
	var guest_id = "";
	var unknown_guest = true;
	var guest_name = "";
	var guest_ip;


	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// API:	
	apiGET = function(model, key, value) {
		console.log("⚙ apiGET()");
		console.log("Model: " + model);

		persist_keywords = false;
		if (model == "script"){
			script_count = 0;
		}

		if (key && value) {
			url = "/api/" + model + "?" + key + "=" + value;
		} else {
			url = "/api/" + model;
		}
		console.log("⬇️ GET: " + url);

		api_get = new XMLHttpRequest();
		api_get.open("GET", url);
		api_get.setRequestHeader("Content-type", "application/json");
		api_get.send();

		api_get.onload = function() {
			if (api_get.status >= 200 && api_get.status < 400) {
				console.log("✅ GET Status: " + api_get.status);
				api_response = JSON.parse(api_get.responseText);

				switch (model) {
					case "chats":
						// Chat API call
						break;
					case "guests":
						// Guest API call
						findGuest(api_response);
						break;
					case "projects":
						// Project API call
						break;
					case "scripts":
						// Script API call
						chooseScript(api_response);
						break;
					default:
						console.log("Error no model");
				}

			} else {
						console.log("❎ Status: " + api_get.status + ", but something went wrong");
			}

		};
		
	};


	apiPOST = function(body, model, item) {
		console.log("⚙ apiPOST()");

		if (item) {
			url = "/api/" + model + "/" + item;
		} else {
			url = "/api/" + model;
		}
		

		console.log("⬆️ POST: " + url + " body: " + body);

		api_post = new XMLHttpRequest();
		api_post.open("POST", url);
		api_post.setRequestHeader("Content-Type", "application/json");
		

		api_post.send(body);

		api_post.onload = function() {
			if (api_post.status >= 200 && api_post.status < 400) {
				console.log("✅ POST Status: " + api_post.status)
				switch (model) {
					case "chats":
						// Chat API call
						break;
					case "guests":
						// Guest API call
						guest_id = JSON.parse(api_post.response)._id;
						askGuestForName();
						break;
					case "projects":
						// Project API call
						break;
					case "scripts":
						// Script API call
						break;
					default:
						console.log("Error no model");
				}




			} else {
				console.log("❎ Status: " + api_post.status + ", but something went wrong");
			}

		};
	};


	apiPATCH = function(body, model, item) {
		console.log("⚙ apiPATCH()");

		url = "/api/" + model + "/" + item;

		console.log("⬆️ PATCH: " + url + " body: " + body);

		api_patch = new XMLHttpRequest();
		api_patch.open("PATCH", url);
		api_patch.setRequestHeader("Content-Type", "application/json");
		

		api_patch.send(body);

		api_patch.onload = function() {
			if (api_patch.status >= 200 && api_patch.status < 400) {
				console.log("✅ PATCH Status: " + api_patch.status)
				switch (model) {
					case "chats":
						// Chat API call
						break;
					case "guests":
						// Guest API call
						break;
					case "projects":
						// Project API call
						break;
					case "scripts":
						// Script API call
						break;
					default:
						console.log("Error no model");
				}

			} else {
				console.log("❎ Status: " + api_patch.status + ", but something went wrong");
			}

		};
	};



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
			tildeSearch(bot_thought)
		}
		$timeout(function() {
			send(who, bot_message)
			script_count += 1;
		}, wait);
	
	}

	tildeSearch = function(bot_thought){
		tilde_index = bot_thought.indexOf("~");
		if (tilde_index > -1) {
			t_insert = "";
			for (t in tilde_insert) {
				alert("t: " + t + " t_i.len: " + tilde_insert.length + "ti: " + tilde_insert);
				til = tilde_insert.length - 1;
				if (t == til) {
					alert("no or " + tilde_insert[t]);
					t_insert += tilde_insert[t];
				} else {
					alert("or!! " + tilde_insert[t]);
					t_insert += tilde_insert[t];
					t_insert += " or ";
					alert()
				}
			}
			b_thought1 = bot_thought.substr(0, tilde_index);
			b_thought2 = bot_thought.substr(tilde_index + 1, bot_thought.length);
			bot_thought = b_thought1 + tilde_insert + b_thought2;
		}
		bot_message = bot_thought;



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
		switch(special) {
			case 1:
				guest_name = data;
				patch_body = {}
				patch_body.name = guest_name;
				apiPATCH(JSON.stringify(patch_body), "guests", guest_id)
				break;
			case 4:
				newGuest();
				break;
		}
	}

	getBotMessage = function(userMessage) {
		console.log("⚙ getBotMessage");
		keyword_found = false;
		if (userMessage){
			// Runs when a user inputs a message
			

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
									apiGET("scripts", "_id", to_script);
									break
								} else {
									console.log("🔕 No keyword")
								}
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
					special = 2;
					getNewScript();
				} else {
					doneChatting = true;
					who = "user";
					console.log("else else " + script_count + " of " + script_length + " Special: " + special)
				}
				
			}
		}
	}




	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Script:
	chooseScript = function(api_response) {
		// Runs when apiGET() loads after calling script model
		console.log("⚙ chooseScript()");

		script_count = 0;
		randomScript = Math.floor((Math.random() * api_response.length));
		current_script = api_response[randomScript];
		script_length = current_script.chats.length;
		keyword_set[current_script._id] = current_script.keywords;


		// Display keywords in console. Keywords are from new script and old scripts with keyword_persist = true.
		for (from_script in keyword_set) {
			console.log("🔑 Current Keywords:");
			for (to_script in keyword_set[from_script]) {
				k = "";
				words = keyword_set[from_script][to_script];
				for (word in words) {
					k += words[word] + ", ";
				}
			}
			console.log("   " + to_script + ": " + k);
		}	

		// Display chats from loaded script in console.
		console.log("📋 Chats loaded: " + current_script.chats);

		getBotMessage();
	}

	getNewScript = function() {
		apiGET("scripts", "special", special);
	}

	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Guest: 

	findGuest = function(api_response) {
		console.log("⚙ findGuest()");

		guests_found = api_response.length;
		if (guests_found === 0) {
			// 0 guests found at IP address
			newGuest();
		} else{
			// 1 guest found at IP address
			askGuestIfName(api_response);
		}
	}

	newGuest = function(){
		console.log("⚙ newGuest()")
		new_guest_ip = []
		new_guest_ip.push(guest_ip);
		new_guest = {
			"ip_addresses": new_guest_ip,
			"last_chat": last_chat
		}
		console.log("Saving Guest:"
			);
		for (g in new_guest) {
			console.log(new_guest[g]);
		}
		apiPOST(JSON.stringify(new_guest), "guests");
		unknown_guest = false;
	}


	askGuestForName = function() {
		console.log("⚙ askGuestForName()")
		console.log("👤 Guest ID: " + guest_id);
		special = 1;
		getNewScript();
		
	}

	askGuestIfName = function(guest) {
		console.log("⚙ askGuestIfName()")
		if (guest.length === 1){
			tilde_insert.push(guest.name);
			special = 4;
			getNewScript();
		} else {
			for (g in guest) {
				tilde_insert.push(guest[g].name);
			}
			alert(tilde_insert);
			special = 8;
			getNewScript();
		}
	}

	returningGuest = function(guest){
		console.log("⚙ returningGuest()")
	}



	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Main: 


	start = function() {
		// Runs when the session starts
		console.log("⚙ start()");
		guest_ip = document.getElementById("guest-ip").innerHTML;
		guest_ip = guest_ip.replace(/\n|\r/g, "").replace(/\s|\r/g, "");
		apiGET("guests", "ip_addresses", guest_ip);
	};





	function toTitleCase(e){var t=/^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;return e.replace(/([^\W_]+[^\s-]*) */g,function(e,n,r,i){return r>0&&r+n.length!==i.length&&n.search(t)>-1&&i.charAt(r-2)!==":"&&i.charAt(r-1).search(/[^\s-]/)<0?e.toLowerCase():n.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1)})};

	waitToStart = function(){
		window.setTimeout(start(), 100);
	}
	window.onload = waitToStart();

	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Listen: 

	// listener is a variable to decide what input to look for
	var enterListener = window;
	var sendListener = document.getElementById("send-button");
	var composer = document.getElementById("composer");
	var message;

	// Listen for the enter key on the start screen to start the chat
	if (count == 0) {
	  listenFor()
	}

	// A pair of functions that chain together to decide what part of the page to listen to, and then see if the 'enter' key is pressed. If it is, run the chat() function to submit an answer if there is one, and ask a new question.
	function listenFor() {
	  console.log("🔈 Starting to listen for Enter Key or Mouse Click.");
	  
	  enterListener.addEventListener("keydown", listen);
	  sendListener.addEventListener("click", listen);
	}

	function listen(e) {
	  chat = false;
	  if (e.keyCode === 13) {
	    e.preventDefault();
	    if (!e.shiftKey) {
	      console.log("⌨ Listen Event: " + e + ", Type: " + e.type + ", Keycode: " + e.keyCode);
	      if (composer.value != "") {
	        chat = true;
	      } else {
	        composer.focus();
	      }
	      
	    }
	  }
	  if (e.type == "click") {
	    console.log("🖱 Listen Event: " + e + ", Type: " + e.type + ", Button: " + e.which);
	    if (composer.value != "") {
	        chat = true;
	    } else {
	      composer.focus();
	    }

	  }
	  if (chat) {
	    pauseListening();
	    message = composer.value;
	    composer.value = "";
	    sendFromUser(message);
	    message = "";
	    listenFor();
	  }
	}


	                                  
	// To avoid double submitting on enter key if someone clicks the button we have top stop listening for enter until the robot sends a question.
	function pauseListening() {
	  enterListener.removeEventListener("keydown", listen);
	  sendListener.removeEventListener("click", listen);
	  console.log("🔇 Stop listening for enter or click.");
	}










});