const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start recognition and game
recognition.start();

// capture what user speaks
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// write user message
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
  `;
}

// check number guessed
function checkNumber(msg) {
  const num = +msg;

  // check if it's a number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `
      <div>"${msg}" is not a valid number</div>
    `;
  }

  // check if number is in range
  else if (num > 100 || num < 1) {
    msgEl.innerHTML = `
      <div>Say a number between 1 and 100</div>
    `;
  }

  // check number
  else if (num === randomNum) {
    document.body.innerHTML = `
    <h2> Congrats! You have guessed the number! <br><br> ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num < randomNum) {
    msgEl.innerHTML += "<div>Go Higher</div>";
  } else {
    msgEl.innerHTML += "<div>Go Lower</div>";
  }
}

// get random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

// speak result
recognition.addEventListener("result", onSpeak);

// end SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
