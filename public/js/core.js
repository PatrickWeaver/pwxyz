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
			script_count = 0;
			// Need to prevent goodbye loop, or store the special?
			apiCall("GET", "scripts", "special", "2")
		}

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
