// Guest

findGuestName = function() {
	console.log("⚙ findGuestName()");

	if (possible_guests.length > 0) {
		for (guest in possible_guests) {
			tilde_insert.push(possible_guests[guest].name);
		}
		special = 2;	
	} else {
		special = 1;
	}
	apiGET("scripts", [["special", special]]);
}
