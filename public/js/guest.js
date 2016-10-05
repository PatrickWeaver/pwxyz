// Guest


guestGET = function(api_response) {
	console.log("⚙ guestGET()");

	number_of_guests = api_response.length;
	console.log(number_of_guests + " possible guests:")
	for (guest in api_response) {
		g = api_response[guest];
		console.log(guest + ". Name: " + g.name + ", Id: " + g._id);
		possible_guests.push(g);
		
	}
	findGuestName();
}


findGuestName = function() {
	console.log("⚙ findGuestName()");

	for (guest in possible_guests) {
		tilde_insert.push(possible_guests[guest].name);
	}
	special = 1;
	apiGET("scripts", [["special", special]]);
}



/*
guestResponse = function(api_response) {
	console.log("⚙ guestResponse()");

	guests = api_response.length;
	console.log("Number of possible guests: " + guests);

	if (guest_name) {
		guest_id = api_response[0]._id;
	} else {

		for (guest in api_response) {
			console.log(guest + ". " + api_response[guest].name);
			possible_guests.push(api_response[guest]);
		}

		switch (guests) {
			case 0:
				newGuest();
				break;
			default:
				askFromNames();
		}

	}
}


askFromNames = function() {
	console.log("⚙ askFromNames()");
	if (possible_guests.length === 1){
		tilde_insert.push(possible_guests[0].name);
		special = 4;
		apiGET("scripts", [["special", special]]);
	} else {
		for (g in possible_guests) {
			tilde_insert.push(possible_guests[g].name);
		}
		special = 8;
		apiGET("scripts", [["special", special]]);
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
	//askGuestForName();
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
	apiGET("scripts", [["special", special]]);
	
}



returningGuest = function(guest){
	console.log("⚙ returningGuest()")
}
*/
