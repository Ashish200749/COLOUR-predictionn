let win = 0, loss = 0;
let level = 1;

const countdownEl = document.getElementById("countdown");
const predictionEl = document.getElementById("prediction");
const statusEl = document.getElementById("status");
const recordEl = document.getElementById("record");
const alertSound = document.getElementById("alertSound");

function predictColor(prevNumber) {
  const avoidEarly = [8, 9];
  const avoidLate = [0, 5];

  const min = new Date().getMinutes();
  if ((min < 30 && avoidEarly.includes(prevNumber)) || (min >= 30 && avoidLate.includes(prevNumber))) {
    return "Skip";
  }

  if ([3, 5, 0].includes(prevNumber)) return "Green";
  if ([2, 4, 6, 8].includes(prevNumber)) return "Red";
  if ([1, 7, 9].includes(prevNumber)) return "Green";
  return "Skip";
}

function updatePrediction() {
  fetch("/latest-result")
    .then(res => res.json())
    .then(data => {
      const num = data.number;
      const result = predictColor(Number(num));

      predictionEl.textContent = `Prediction: ${result}`;
      statusEl.textContent = `Last Number: ${num}`;

      if (result === "Skip") {
        level = 1;
        return;
      }

      const won = Math.random() > 0.5;
      if (won) {
        win++;
        level = 1;
      } else {
        loss++;
        level++;
        if (level >= 3) {
          navigator.vibrate(500);
          alertSound.play();
        }
      }

      recordEl.textContent = `Win: ${win} | Loss: ${loss}`;
    });
}

let time = 60;
setInterval(() => {
  time--;
  countdownEl.textContent = time;
  if (time === 0) {
    time = 60;
    updatePrediction();
  }
}, 1000);