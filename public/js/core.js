var app = angular.module('Chats', []);

app.controller('mainController', function($scope, $http) {
	$scope.formData = {};


	$scope.chats = [
		{
			who: 'bot', timestamp: Date.now(), message: "Hi, I'm PW, you're probably looking for Patrick but he's not here. You can talk to me instead."
		}

	]

	$scope.userChat = function() {
		compose_area = document.getElementById("composer");
		message = compose_area.value;
		compose_area.value = ""
		$scope.chats.push({
			who: 'user', timestamp: Date.now(), message: message
		});
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