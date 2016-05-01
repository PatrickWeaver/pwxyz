var app = angular.module('Chats', []);

app.controller('mainController', function($scope, $http) {
	$scope.formData = {};

	$http.get('/api/chats')
		.success(function(data){
			$scope.chats = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
});