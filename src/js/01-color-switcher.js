const refs = {
  bodyChangeColor: document.querySelector('body'),
  buttonStart: document.querySelector('.start__btn'),
  buttonStop: document.querySelector('.stop__btn'),
};

let timerId = null;
const PROMPT_DELAY = 1000;


refs.buttonStart.addEventListener('click', onStartBodyChangeColor);
refs.buttonStop.addEventListener('click', onStopBodyChangeColor);

function onStartBodyChangeColor(event) {
  event.preventDefault();

  timerId = setInterval(() => {
    refs.bodyChangeColor.style.backgroundColor = getRandomHexColor();
  }, PROMPT_DELAY);

  refs.buttonStart.setAttribute('disabled', '');
}

function onStopBodyChangeColor() {
  clearInterval(timerId);
  refs.buttonStart.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
