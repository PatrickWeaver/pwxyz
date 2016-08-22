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

	getBotMessage = function(userMessage) {
		var botMessage

		scriptCall = new XMLHttpRequest();
		// Problem that it starts over every time, does too many API calls, and goes back to original script.
		scriptCall.open("GET", "/api/scripts?script=1");
		scriptCall.send();

		scriptCall.onload = function() {
			if (scriptCall.status >= 200 && scriptCall.status < 400) {
				// Switch this to random at some point
				scriptToUse = JSON.parse(scriptCall.responseText)[0];
				scriptLength = scriptToUse.chats.length;
				alert("1. " + scriptToUse.chats);

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
								alert("Keyword! " + searchWord);
								scriptCall2 = new XMLHttpRequest();
								url = "/api/scripts/" + switcherToUse.toScripts[0];
								alert(url);
								scriptCall2.open("Get", url);
								scriptCall2.send();

								scriptCall2.onload = function() {
									if (scriptCall2.status >= 200 && scriptCall2.status < 400) {
										scriptCount = 0;
										//took out [0] but what if there is more than 1?
										scriptToUse = JSON.parse(scriptCall2.responseText);
										alert("2. " + scriptToUse.chats);

									botMessage = scriptToUse.chats[scriptCount];
									sendToBot(botMessage);
									scriptCount += 1;
									}

								};
								scriptCall2.onerror = function() {
									console.log('Error: ' + scriptCall2.status);
								}
								keywordFound = true;
								break
							} else {
								alert("no keyword");
							}
						}
						if (!keywordFound){
							botMessage = scriptToUse.chats[scriptCount];
							sendToBot(botMessage);
							scriptCount += 1;
						}

					} else {
						console.log("status" + switcherCall.status + ", but something went wrong");
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
	}


	sendToBot = function(botMessage) {
		who = "bot";
		wait = 400;
		$timeout(function() {
			send(who, botMessage)
		}, wait);
	}
});