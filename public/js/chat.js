// To Do:
// Reset Button
// Adele on empty submit
// Reads name and sends it back to you in another question
// Graceful exit
// Separate into funcitons
// Two bots?
// Small delay before question is asked
// tone.js sounds4

// This is a list of questions the robot will ask you
var questions = [
  "Hi, I'm PW, you're probably looking for Patrick but he's not here. You can talk to me instead.",
  "How are you doing today?",
  "I don't know very much yet"
];

// count is a variable to keep track of how many questions we have asked
// listener is a variable to decide what input to look for
// blank is a variable to check for blank input
// what_to_clear is a variable to keep track of what to clear from the screen (start button or completed text input)
var count = 0;
var listener;
var blank = false;
var what_to_clear;

// Listen for the enter key on the start screen to start the chat
if (count == 0) {
  listen_for();
}

function chat(input_id) {
  stop_listening();
  find_answer(input_id);
  send_answer();
  ask_question();
  listen_for();
  scroll_down();
}

// To avoid double submitting on enter key if someone clicks the button we have top stop listening for enter until we create our next input box
function stop_listening() {
  listener.removeEventListener('keydown', listen_for_enter);
}


function find_answer(input_to_find) {
  // Identify what to clear away, either the start button or the previous text input
  what_to_clear = document.getElementById(input_to_find);

  // If the robot has already asked you a question then answer it
  if (count > 0) {
    // Grab the text you typed into the text input
    // and check if it is blank
    answer = document.getElementById('i' + count).value;
    if (answer == "") {
      blank = true;
    }
  }
  
  // Clear away either the start button or the previous text input
  what_to_clear.innerHTML = "";
}


function send_answer() {
  if (count > 0) {
    // Insert an answer bubble above the text input and put the text you typed into it
    what_to_clear.insertAdjacentHTML("beforebegin", "<div class='chat_container'><div class='chat_wrapper' id='chat_a" + count + "'><p id='a" + count + "' class='a'>" + answer + "</p><div class='chat_dolphin'></div></div></div>");
  }
}


function ask_question() {
  
  if (blank == true) {
    adele();
  } else {
    // Pick the next question from the list
    question = questions[count]
  }

  // Tally another question asked
  count += 1;

  // Insert a question bubble below the now empty start button or text input wrapper and put the next question in it, then below that insert a new text input box, then put a submit button that will call this function again.
  // Watch out for the escpaed quotation marks (\"), we need them to do triple level quotes!
  what_to_clear.insertAdjacentHTML(
    "afterend", "<div class='chat_container'><div class='chat_wrapper' id='chat_q" + count + "'><p id='q" + count + "' class='q'>" + question + "</p><div class='chat_robot'></div></div></div><div id='form" + count + "' class='f'><textarea class='text_input' type='text' cols='960' rows='3' id='i" + count + "' autofocus='autofocus'></textarea><button id='button" + count + "' onclick=\"chat('form" + count + "')\">&#8629;</button></div>");
}


// A pair of functions that chain together to decide what part of the page to listen to, and then see if the 'enter' key is pressed. If it is, run the chat() function to submit an answer if there is one, and ask a new question.
function listen_for() {
  if (count == 0) {
    listener = window;
  } else {
    listener = document.getElementById('i' + count);
    listener.focus();
  }
  listener.addEventListener("keydown", listen_for_enter);
}
  
function listen_for_enter(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!e.shiftKey) {
      chat('form' + count);
    }
  }
}


// Find the submit button and make sure that the window scrolls down to show it.
function scroll_down() {
  document.getElementById('button' + count).scrollIntoView();
}

function adele() {
  question = "Hello, can you hear me?";
  blank = false;
}

window.onload=chat('form0');