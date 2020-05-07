const container = document.getElementById("container");
const text = document.getElementById("text");
const pointerContainer = document.getElementById("pointer-container");

const totalTime = 7500,
  breatheTime = totalTime * 0.4,
  holdTime = totalTime * 0.2;

// initial text
text.innerHTML = "<button onclick='start()'>Click Here to Start.</button>";

function breatheAnimation() {
  text.innerText = "breathe in";
  container.className = "container grow";
  setTimeout(() => {
    text.innerText = "hold";

    setTimeout(() => {
      text.innerText = "breathe out";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

// breatheAnimation();

function start() {
  pointerContainer.classList = "pointer-container rotate"
  breatheAnimation();
  setInterval(breatheAnimation, totalTime);
}
