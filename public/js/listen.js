// * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^  * ^ * ^ 
// Listen: 

// listener is a variable to decide what input to look for
var enterListener = window;
var sendListener = document.getElementById("send-button");
var resetListener = document.getElementById("reset-button");
var composer = document.getElementById("composer");
var message;

// Listen for the enter key on the start screen to start the chat
if (count == 0) {
  listenFor()
}

// A pair of functions that chain together to decide what part of the page to listen to, and then see if the 'enter' key is pressed. If it is, run the chat() function to submit an answer if there is one, and ask a new question.
function listenFor() {
  console.log("🔈 Starting to listen for Enter Key or Mouse Click.");
  
  enterListener.addEventListener("keydown", listen);
  sendListener.addEventListener("click", listen);
  resetListener.addEventListener("click", reset);

}

function listen(e) {
  chat = false;
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!e.shiftKey) {
      console.log("⌨ Listen Event: " + e + ", Type: " + e.type + ", Keycode: " + e.keyCode);
      if (composer.value != "") {
        chat = true;
      } else {
        composer.focus();
      }
      
    }
  }
  if (e.type == "click") {
    console.log("🖱 Listen Event: " + e + ", Type: " + e.type + ", Button: " + e.which + " send");
    if (composer.value != "") {
        chat = true;
    } else {
      composer.focus();
    }

  }
  if (chat) {
    pauseListening();
    message = composer.value;
    safe_message = message.replace(/<|>|\(|\)|"|'/g, '');


    composer.value = "";
    sendFromUser(safe_message);
    message = "";
    listenFor();
  }
}


                                  
// To avoid double submitting on enter key if someone clicks the button we have top stop listening for enter until the robot sends a question.
function pauseListening() {
  enterListener.removeEventListener("keydown", listen);
  sendListener.removeEventListener("click", listen);
  console.log("🔇 Stop listening for enter or click.");
}


function reset(e) {
  if (e.type == "click") {
    console.log("🖱 Listen Event: " + e + ", Type: " + e.type + ", Button: " + e.which + " reset");
    reset_chat();
  }
}

reset_chat = function() {
  console.log("⚙ reset()");
  if (guest_id === ""){
    console.log(tilde_insert);
    setVariables();
    console.log(tilde_insert);
    start(); 
  } else {
    special = 5;
    apiGET("scripts", [["special", special]]);
  }
}