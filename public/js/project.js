// Project

projectGET = function(api_response) {
	console.log("⚙ projectGET()");

	switch (special){
		case 5:
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
			tilde_insert.push(p.media);
			tilde_insert.push(p.alias);
			tilde_insert.push(p.collaborators);
			tilde_insert.push(p.url);
			tilde_insert.type = "project list";
			special = 9;
			break;
	}

	/*

	name: String,
	media: Array,
	url: String,
	alias: String,
	collaborators: Array

	*/

	apiGET("scripts", [["special", special]]);
}