var app = angular.module('Chats', []);
var count  = 0;
var scriptCount = 0;



app.controller('mainController', function($scope, $http, $timeout) {
	$scope.formData = {};


	$scope.chats = [
		{
			who: 'bot', timestamp: Date.now(), message: "Hi, I'm PW, you're probably looking for Patrick but he's not here. You can talk to me instead."
		}

	]

	send = function(who, message) {
		console.log("sending: " + message)
		$scope.chats.push({
			who: who, timestamp: Date.now(), message: message
		})
	}

	getBotMessage = function() {
		var data;
		var firstData;

		call = new XMLHttpRequest();
		call.open("GET", "/api/scripts?script=1");

		call.onload = function() {
			console.log("Request Status:");
			console.log(call.status);
			if (call.status >= 200 && call.status < 400) {
				data = JSON.parse(call.responseText);
				firstData = data[0];
				message = firstData.chats[scriptCount]
				scriptCount += 1;
			} else {
				console.log("status ok, but something went wrong");
			}
		};
		call.onerror = function() {
			console.log('Error: ' + call.status);
		}

		call.send();

		return message;
	}


	sendToBot = function() {
		who = "bot";
		wait = 400;
		message = getBotMessage();

		$timeout(function() {
			send(who, message)
		}, wait);
	}
});