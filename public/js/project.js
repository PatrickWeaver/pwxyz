// Project

projectGET = function(api_response) {
	console.log("⚙ projectGET()");

	switch (special){
		case 5:
			tilde_insert = [];
			for (p in api_response){
				if (api_response[p].media){
					for (m in api_response[p].media){
						if (tilde_insert.indexOf(api_response[p].media[m]) === -1){
							tilde_insert.push(api_response[p].media[m]);
						}
					}
				}
			}
			special = 10;
			
			break;
		case 10:
		case 11:
			for (p in api_response){
				if (api_response[p].name){
					tilde_insert.push(api_response[p].name);
				}
			}
			special = 8;
			
			break;
		case 8:
			tilde_insert = [];
			p = api_response[0];
			tilde_insert.push(p.name);
			tilde_insert.push(p.media[0]);
			if (p.alias){
				tilde_insert.push(p.alias);
			} else {
				tilde_insert.push("Patrick Weaver");
			}
			if (p.collaborators[0]) {
				tilde_insert.push(p.collaborators);
			} else {
				tilde_insert.push("no one else");
			}
			tilde_insert.push(p.url);
			tilde_insert.type = "project list";
			special = 9;
			break;
	}
	if (api_response[0]){
		apiGET("scripts", [["special", special]]);
	} else {
		apiGET("scripts", [["special", 12]]);
	}
}