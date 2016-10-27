// Script

scriptGET = function(api_response) {
	console.log("⚙ scriptGET()");
	
	//Clear old current_script:
	if (current_script){
		if (!current_script.persist_keywords){
			delete keyword_set[current_script._id];
		}
	}
	script_count = 0;

	randomScript = Math.floor((Math.random() * api_response.length));
	current_script = api_response[randomScript];
	special = current_script.special;
	script_length = current_script.chats.length;
	keyword_set[current_script._id] = current_script.keywords;

	console.log("📜 Current Script: " + current_script._id);

	// Change to remove 
	for (from_script in keyword_set) {
		console.log("🔑 Current Keywords:");
		for (to_script in keyword_set[from_script]) {
			k = "";
			words = keyword_set[from_script][to_script];
			for (word in words) {
				k += words[word] + ", ";
			}
		}
		console.log("   " + to_script + ": " + k);
	}

	botChat();
}
