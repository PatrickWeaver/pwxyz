var app = angular.module('Chats', []);


app.controller('mainController', function($scope, $http, $timeout) {
	$scope.formData = {};


	$scope.chats = [
		{
			who: 'bot', timestamp: Date.now(), message: "Hi, I'm PW, you're probably looking for Patrick but he's not here. You can talk to me instead."
		}

	]

	$scope.send = function(who, message) {
		console.log("sending: " + message)
		$scope.chats.push({
			who: who, timestamp: Date.now(), message: message
		})
	}

	$scope.userChat = function() {
		compose_area = document.getElementById("composer");
		message = compose_area.value;
		who = "user";
		compose_area.value = "";
		$scope.send(who, message);
		$scope.sendToBot();
	}

	$scope.sendToBot = function() {
		who = "bot";
		message = "I received your chat.";
		wait = 400;

		$timeout(function() {
			$scope.send(who, message)
		}, wait);
	}




/*

	$http.get('/api/chats')
		.success(function(data){
			$scope.chats = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

		*/
});