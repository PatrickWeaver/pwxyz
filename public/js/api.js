apiGET = function(model, key, value) {
	console.log("⚙ apiGET()");

	persist_keywords = false;
	if (model == "script"){
		script_count = 0;
	}

	if (key && value) {
		url = "/api/" + model + "?" + key + "=" + value;
	} else {
		url = "/api/" + model;
	}
	console.log("GET: " + url);

	api_get = new XMLHttpRequest();
	api_get.open("GET", url);
	api_get.setRequestHeader("Content-type", "application/json");
	api_get.send();

	api_get.onload = function() {
		if (api_get.status >= 200 && api_get.status < 400) {
			api_response = JSON.parse(api_get.responseText);
			numberOf = api_response.length;
			// alert(numberOf);
			if (model == "scripts") {
				scriptsOnLoad(api_response, numberOf);
			} else if (model == "guests") {
				guestsOnLoad(api_response, numberOf);
			} else {
				console.log("not scripts or guests model: " + model)
			}
		} else {
					console.log("!! Status: " + api_get.status + ", but something went wrong");
		}

	};
	
};


scriptsOnLoad = function(api_response, numberOf) {
	console.log("⚙ scriptsOnLoad()");
	randomScript = Math.floor((Math.random() * numberOf)); 
	current_script = api_response[randomScript];
	script_length = current_script.chats.length;
	key = current_script._id;
	keyword_set[key] = current_script.keywords;

	if (current_script.special == 1) {
		persist_keywords = true;
	}
	for (from_chat_script in keyword_set)	{
		console.log("👀 Keywords from Chat " + from_chat_script + ":");
		for (to_chat_script in keyword_set[from_chat_script]) {
			current_keywords = "";
			for (to_chat in keyword_set[from_chat_script][to_chat_script]) {
				current_keywords += keyword_set[from_chat_script][to_chat_script][to_chat];
				current_keywords += ", ";
			}
			current_keywords = current_keywords.substr(0,current_keywords.length - 2);
			console.log("  To Chat " + to_chat_script + ": " + current_keywords);
		}
	}
	console.log("-> Chats Loaded: " + current_script.chats)
	sendToBot();
}

guestsOnLoad = function(api_response, numberOf){
	console.log("⚙ guestsOnLoad");
	if (numberOf < 1) {
		console.log("Zero guests found");
		newGuest();
	} else if (numberOf == 1) {
		console.log("One guest found");
		names = []
		for (name in api_response[0].names) {
			names.push(api_response[0].names[name]);
		}
		console.log("guest: " + api_response[0].guest_id + ": " + names);
		if (names.length == 1) {
			guest_id = api_response[0].guest_id;
		} else {
			special = 4;
			tilde_insert[0] = "";
			for (name in names) {
				tilde_insert[0] += names[name];
				if (name == names.length - 2) {
					if (names.length > 2) {
						tilde_insert[0] += ",";
					}
					tilde_insert[0] += " or ";
				} else if (name == names.length - 1) {
					break
				} else {
					tilde_insert[0] += ", "
				}
				
			}
			console.log(tilde_insert);
		}
	} else {
		console.log("Many guests found");
	}
}



apiPOST = function(body, model, key, value) {
	console.log("⚙ apiPOST()");

	if (key && value) {
		url = "/api/" + model + "?" + key + "=" + value;
	} else {
		url = "/api/" + model;
	}
	

	console.log("POST: " + url + " body: " + body);

	api_post = new XMLHttpRequest();
	api_post.open("POST", url);
	api_post.setRequestHeader("Content-Type", "application/json");
	

	api_post.send(body);

	api_post.onload = function() {
		if (api_post.status >= 200 && api_post.status < 400) {
			console.log("!! Status: " + api_post.status)
			if (model == "guests"){
				guest_id = JSON.parse(api_post.response)._id;
				console.log("Guest ID: " + guest_id);
			}

		} else {
			console.log("!! Status: " + api_post.status + ", but something went wrong");
		}

	};
};