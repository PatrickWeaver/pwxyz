var unknown_guest = true;
var guest_name = "";
var guest_ip = document.getElementById("guest-ip").innerHTML;

findGuest = function(guestIP) {
	console.log("⚙ findGuest()");
	guest_call = apiGET("guests", "ip_addresses", guest_ip);
}

newGuest = function(){
	console.log("⚙ newGuest()")
	new_guest_ip = []
	new_guest_ip.push(guest_ip);
	new_guest = {
		"name": guest_name,
		"ip_addresses": new_guest_ip,
		"last_chat": last_chat
	}
	console.log("Saving Guest:"
		);
	for (g in new_guest) {
		console.log(g + ": " + new_guest[g]);
	}
	apiPOST(JSON.stringify(new_guest), "guests");
	unknown_guest = false;
	getBotMessage(last_chat);
}