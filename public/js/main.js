
	
	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Variables:	






	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Script:


	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Guest: 

	findGuest = function(api_response) {
		console.log("⚙ findGuest()");

		guests_found = api_response.length;
		if (guests_found === 0) {
			// 0 guests found at IP address
			newGuest();
		} else{
			// 1 guest found at IP address
			askGuestIfName(api_response);
		}
	}

	newGuest = function(){
		console.log("⚙ newGuest()")
		new_guest_ip = []
		new_guest_ip.push(guest_ip);
		new_guest = {
			"ip_addresses": new_guest_ip,
		}
		console.log("Saving Guest:"
			);
		for (g in new_guest) {
			console.log(new_guest[g]);
		}
		apiPOST(JSON.stringify(new_guest), "guests");
		unknown_guest = false;
	}

	newGuestWithName = function(){
		console.log("⚙ newGuestWithName()")
		new_guest_ip = []
		new_guest_ip.push(guest_ip);
		new_guest = {
			"ip_addresses": new_guest_ip,
			"name": guest_name
		}
		console.log("Saving Guest:"
			);
		for (g in new_guest) {
			console.log(new_guest[g]);
		}
		apiPOST(JSON.stringify(new_guest), "guests");
		unknown_guest = false;
	}


	askGuestForName = function() {
		console.log("⚙ askGuestForName()")
		console.log("👤 Guest ID: " + guest_id);
		special = 1;
		getNewScript();
		
	}



	returningGuest = function(guest){
		console.log("⚙ returningGuest()")
	}



	// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
	// Main: 



