import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputDateTime: document.querySelector('input#datetime-picker'),
  buttonStart: document.querySelector('.start__btn'),
  valueDays: document.querySelector('.value__days'),
  valueHours: document.querySelector('.value__hours'),
  valueMinutes: document.querySelector('.value__minutes'),
  valueSeconds: document.querySelector('.value__seconds'),
};

refs.buttonStart.addEventListener('click', onStartCountdownTimer);
let timerId = null;
let DataTimeCountdownTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.buttonStart.removeAttribute('disabled');

    DataTimeCountdownTimer = selectedDates[0] - options.defaultDate;
  },
};

const fp = flatpickr(refs.inputDateTime, options);

function onStartCountdownTimer(event) {
  event.preventDefault();
  const startTime = Date.now();

  timerId = setInterval(() => {
    const currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    let intervalTime = DataTimeCountdownTimer - elapsedTime;

    let DataTime = convertMs(intervalTime);
    if (intervalTime < 1000) {
      clearInterval(timerId);
    }

    refs.valueDays.textContent = DataTime.days;
    refs.valueHours.textContent = DataTime.hours;
    refs.valueMinutes.textContent = DataTime.minutes;
    refs.valueSeconds.textContent = DataTime.seconds;
    refs.buttonStart.setAttribute('disabled', '');
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
