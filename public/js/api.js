// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
// API:	

apiGET = function(model, parameters) {
	console.log("⚙ apiGET()");

	url = "/api/" + model;
	if (typeof parameters == "string"){
		url = url.concat("/", parameters);
	} else if (typeof parameters == "object") {
		url = url.concat("?");
		for (i = 0; i < parameters.length; i++) {
			url = url.concat(parameters[i][0], "=", parameters[i][1]);
			if (i < (parameters.length - 1)) {
				url = url.concat("&");
			}
		}
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
					//chatResponse(api_response);
					break;
				case "guests":
					// Guest API call
					guestGET(api_response);
					break;
				case "projects":
					// Projects API call
					projectGET(api_response);
					break;
				case "scripts":
					// Script API call
					scriptGET(api_response);
					break;

				default:
					console.log("Error no model");
			}

		} else {
					console.log("❎ GET (" + model + ") Status: " + api_get.status + ", but something went wrong");
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
					/*guest_id = JSON.parse(api_post.response)._id;
					if (guest_name = "") {
						askGuestForName();
					}*/
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
			console.log("❎ POST Status: " + api_post.status + ", but something went wrong");
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
			console.log("❎ PATCH Status: " + api_patch.status + ", but something went wrong");
		}

	};
};