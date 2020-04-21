const main = document.querySelector("main"),
  voicesSelect = document.getElementById("voices"),
  textArea = document.getElementById("text"),
  readBtn = document.getElementById("read"),
  toggleBtn = document.getElementById("toggle"),
  closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm thirsty",
  },

  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

// create image box;

function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
   <img src='${image}' alt = '${text}'>
   <p class = 'info'>${text}</p> 
  `;

  // speak event
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // add active class effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

// init speech synth utterance
const message = new SpeechSynthesisUtterance();

// create voices array
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// speak text
function speakText() {
  speechSynthesis.speak(message);
}

// set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// changed voices
speechSynthesis.addEventListener("voiceschanged", getVoices);

// toggle text box
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// remove text box
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// change voice
voicesSelect.addEventListener('change', setVoice);

// read typed text
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
})

getVoices();
