import Notiflix from 'notiflix';

let delay = 0;
let step = 0;
let amount = 0;
let position = 0;

const refs = {
  inputDelay: document.querySelector('.delay'),
  inputStep: document.querySelector('.step'),
  inputAmount: document.querySelector('.amount'),
  buttonSubmit: document.querySelector('.submit'),
};

refs.inputDelay.addEventListener('input', onInputDelay);
refs.inputStep.addEventListener('input', onInputStep);
refs.inputAmount.addEventListener('input', onInputAmount);
refs.buttonSubmit.addEventListener('click', onSubmit);

function onInputDelay(event) {
  event.preventDefault();
  delay = parseInt(event.target.value);
}

function onInputStep(event) {
  event.preventDefault();
  step = parseInt(event.target.value);
}

function onInputAmount(event) {
  event.preventDefault();
  amount = parseInt(event.target.value);
}

function onSubmit(event) {
  event.preventDefault();
  setTimeout(function run() {
    position += 1;

    if (position === amount || amount === 0 || amount === 1) {
      return createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;

    setTimeout(run, delay);
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     if (shouldResolve) {
//       resolve('Проміс виконується успішно');
//     } else {
//       reject('Проміс ПОМИЛКА');
//     }
//   });
// }

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
