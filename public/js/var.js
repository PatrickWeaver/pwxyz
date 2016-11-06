

setVariables = function() {
	console.log("⚙ setVariables()");
	// Chat:
	count = 0;
	tilde_insert = [];
	//var bot_message;


	// Guest:
	guest_ip = "";
	guest_id = "";
	guest_name = "";
	possible_guests = [];


	// Script:
	keyword_set = {};

	// Chat:
	question = false;

}

var count = 0;
var tilde_insert = [];
//var bot_message;


// Guest:
var guest_ip = "";
var guest_id = "";
var guest_name = "";
var possible_guests = [];

// Script:
var current_script;
var script_length;
var keyword_set = {};

// Chat:
var question = false;

setVariables();

// Language:
var yes = ["yes", "ya", "yeah", "yup", "ok"];

<<<<<<< HEAD

function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    //var s = d.getSeconds();
    //var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        //dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    //m = m<d.10?"0"+m:m;

    //s = s<10?"0"+s:s;

    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */

    //var pattern = new RegExp("0?"+hh+":"+m+":"+s);

    //var replacement = h+":"+m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    //replacement += " "+dd;    

    time = h + ":" + m;

    return time;
}	
=======
>>>>>>> 2175e353770ad421b6ac6e4375d3ecce86c469a7
