var app = angular.module('Chats', []);
var count  = 0;
var script_count = 0;

var current_script;
var script_length;


app.controller('mainController', function($scope, $http, $timeout) {
	$scope.formData = {};

	$scope.chats = [];
	
	start = function() {
	start_call = apiCall("GET", "scripts", "special", "1");
	};

	send = function(who, sentMessage) {
		// Runs when a user inputs a message or when a bot finds a message using getBotMessage()
		console.log("sending: '" + sentMessage + "' from " + who)
		$scope.chats.push({
			who: who, timestamp: Date.now(), message: sentMessage
		})
	}

	getBotMessage = function(userMessage) {
		// Runs when a user inputs a message
		if (script_length > script_count) {
			console.log(" || On " + script_count + " of " + script_length + " in script.");
			sendToBot();
		} else {
			// Go to pre-goodbye or goodbye script
			console.log(" || On " + script_count + " of " + script_length + " in script. I am out of things to say.");
			sendToBot("I am out of things to say");
		}







		/*

			scriptCall = new XMLHttpRequest();
			// Problem that it starts over every time, does too many API calls, and goes back to original script.
			scriptCall.open("GET", "/api/scripts?script=1");
			scriptCall.send();

			scriptCall.onload = function() {
				if (scriptCall.status >= 200 && scriptCall.status < 400) {
					// Switch this to random at some point
					scriptToUse = JSON.parse(scriptCall.responseText)[0];
					scriptLength = scriptToUse.chats.length;
					console.log("<> Script Loaded: " + scriptToUse.chats);

					switcherCall = new XMLHttpRequest();
					// This might break if there are more than 1 fromScript in the array?
					switcherCall.open("GET", "/api/switchers?fromScripts=" + scriptToUse._id);
					switcherCall.send();

					switcherCall.onload = function() {
						keywordFound = false;
						//Put this in a function
						if(switcherCall.status >=200 && switcherCall.status < 400) {
							// Switch this to random at some point
							switcherToUse = JSON.parse(switcherCall.responseText)[0];
							for (keyword in switcherToUse.keywords) {
								searchWord = switcherToUse.keywords[keyword];
								if (userMessage.includes(searchWord)) {
									console.log("<> Keyword! '" + searchWord + "' found in user input");
									scriptCall2 = new XMLHttpRequest();
									url = "/api/scripts/" + switcherToUse.toScripts[0];
									console.log("<> Switching to: " + url);
									scriptCall2.open("Get", url);
									scriptCall2.send();

									scriptCall2.onload = function() {
										if (scriptCall2.status >= 200 && scriptCall2.status < 400) {
											scriptCount = 0;
											//took out [0] but what if there is more than 1?
											scriptToUse = JSON.parse(scriptCall2.responseText);
											console.log("<> Switched script, script loaded: " + scriptToUse.chats);

										botMessage = scriptToUse.chats[script_count];
										sendToBot(bot_message);
										script_count += 1;
										}

									};
									scriptCall2.onerror = function() {
										console.log('Error: ' + scriptCall2.status);
									}
									keywordFound = true;
									break
								} else {
									console.log("<> '" + searchWord + "' keyword not found in user input");
								}
							}
							if (!keywordFound){
								botMessage = scriptToUse.chats[script_count];
								sendToBot(bot_message);
								script_count += 1;
							}

						} else {
							console.log("!! Status: " + switcherCall.status + ", but something went wrong");
						}

					};
					switcherCall.onerror = function() {
						console.log('Error: ' + switcherCall.status)
					}



					
					
					
				} else {
					console.log("status" + scriptCall.status + ", but something went wrong");
				}
			};
			scriptCall.onerror = function() {
				console.log('Error: ' + scriptCall.status);
			}


		*/

	}




	sendToBot = function(parameter) {
		// Runs when an api call returns a response
		who = "bot";
		wait = 400;
		if (parameter){
			bot_message = parameter;
		} else {
			bot_message = current_script.chats[script_count];
		}
		$timeout(function() {
			send(who, bot_message)
			script_count += 1;
		}, wait);
		
	}




apiCall = function(reqType, model, key, value) {
	url = "/api/" + model + "?" + key + "=" + value;

	api_call = new XMLHttpRequest();
	api_call.open(reqType, url);
	api_call.send();

	api_call.onload = function() {
		if (api_call.status >= 200 && api_call.status < 400) {
			api_response = JSON.parse(api_call.responseText);
			numberOf = api_response.length;
			randomScript = Math.floor((Math.random() * numberOf)); 
			current_script = api_response[randomScript];
			script_length = current_script.chats.length;
			console.log("<> Script Loaded: " + current_script.chats);
			sendToBot();

		} else {
					console.log("!! Status: " + api_call.status + ", but something went wrong");
				}

	};
};

start();


});
