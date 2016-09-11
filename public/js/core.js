var app = angular.module('Chats', []);
var count  = 0;
var script_count = 0;
var special = 1
var doneChatting = false;
var keywords;
var switch_to;

var current_script;
var script_length;

var newchat = "o";


app.controller('mainController', function($scope, $http, $timeout, $location, $anchorScroll) {
	$scope.formData = {};

	$scope.chats = [];
	
	start = function() {
		console.log("## start()");
		start_call = apiCall("GET", "scripts", "special", special);
	};

	send = function(who, sentMessage) {
		console.log("## send()");
		// Runs when a user inputs a message or when a bot finds a message using getBotMessage()
		console.log("sending: '" + sentMessage + "' from " + who)
		$scope.chats.push({
			id: count, who: who, timestamp: Date.now(), message: sentMessage, count: count
		});
		$location.hash('chat-' + count);
		$anchorScroll();
		count += 1;
	}


	sendFromUser = function(userMessage) {

		console.log("## sendFromUser()");
		who = "user";
		wait = 10;
		$timeout(function() {
			send(who, userMessage)
			getBotMessage(userMessage);
		}, wait);
		
	}



	getBotMessage = function(userMessage) {
		console.log("## getBotMessage");
		// Runs when a user inputs a message

		/*
		for (k in keywords) {
			if (userMessage.includes(keywords[k])){
				console.log("@ keyword found");
				apiCall("GET", "scripts", "_id", switch_to);
				break
			} else {
				console.log("@ no keyword")
			}
		}
		*/

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
				apiCall("GET", "scripts", "special", special)
			} else {
				doneChatting = true;
				who = "user";
				console.log("else else " + script_count + " of " + script_length + " Special: " + special)
			}
			
		}

	}


	sendToBot = function(parameter) {
		console.log("## sendToBot()");
		// Runs when an api call returns a response
		who = "bot";
		wait = 800;
		if (parameter){
			bot_message = parameter;
		} else {
			bot_message = current_script.chats[script_count];
		}
		$timeout(function() {
			console.log("sendToBot() TIMEOUT")
			send(who, bot_message)
			script_count += 1;
		}, wait);
		
	}


	apiCall = function(reqType, model, key, value) {
		console.log("## apiCall()");
		url = "/api/" + model + "?" + key + "=" + value;
		console.log("Called: " + url);

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
				sendToBot();

			} else {
						console.log("!! Status: " + api_call.status + ", but something went wrong");
					}

		};
	};

start();


});
