/*

This JavaScript file has code to allow a user to choose to press the Start or ⏎ button, or to press the Enter key on their keyboard using the .keycode property.

*/

// listener is a variable to decide what input to look for
var enterListener = window;
var sendListener = document.getElementById("send-button");
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
}

function listen(e) {
  chat = false;
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!e.shiftKey) {
      console.log("⌨ Listen Event: " + e + ", Type: " + e.type + ", Keycode: " + e.keyCode);
      chat = true;
    }
  }
  if (e.type == "click") {
    console.log("🖱 Listen Event: " + e + ", Type: " + e.type + ", Button: " + e.which);
    chat = true;

  }
  if (chat) {
    pauseListening();
    message = composer.value;
    composer.value = "";
    send("user", message);
    message = "";
    sendToBot();
    listenFor();
  }
}


                                  
// To avoid double submitting on enter key if someone clicks the button we have top stop listening for enter until the robot sends a question.
function pauseListening() {
  enterListener.removeEventListener("keydown", listen);
  sendListener.removeEventListener("click", listen);
  console.log("🔇 Stop listening for enter or click.");
}

 