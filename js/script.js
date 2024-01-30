const showDays = document.querySelector(".days");
//date input
const dateInput = document.querySelector(".date-input");
const dateDispenseInput = document.querySelector(".date-dispense-input");
//number input
const frequencyNumber = document.querySelector(".frequency");
const quantityNumber = document.querySelector(".quantity");
const dosesNumber = document.querySelector(".doses");
const dispensedDoses = document.querySelector(".dispensed-doses");
//output
const daysTreatment = document.querySelector(".days-treatment");
const countButton = document.querySelector('button[type="submit"]');
const dosesLeft = document.querySelector(".doses-amount-left");
const nextDispensing = document.querySelector(".next-dispensing");

let currentDate;
let choosedDate;
let choosedDispenseDate;
let days;
let frequencyValue;
let quantityValue;
let doseValue;
let prescribedDaysTreatment;
let dispensedDosesDrug;

function getData() {
  const date = new Date();
  return (currentDate = date.getTime());
}

function countingDays() {
  console.log(choosedDate, currentDate);
  const countedDays = currentDate - choosedDate;
  console.log(countedDays);
  days = countedDays / 86400000;
  showDays.textContent = `Ilość dni od wystawienia recepty: ${days.toFixed(0)}`;
}

function convertDate(event) {
  const setDate = event.currentTarget.value;
  console.log(setDate);
  const date = new Date(setDate);
  console.log(date);
  getData();
  choosedDate = date.getTime();
  countingDays();
}

function convertDateDispense(event) {
  const setDate = event.currentTarget.value;
  console.log(setDate);
  const date = new Date(setDate);
  console.log(date);
  choosedDispenseDate = date.getTime();
  console.log(choosedDispenseDate);
}

dateInput.addEventListener("input", convertDate);
dateDispenseInput.addEventListener("input", convertDateDispense);

frequencyNumber.addEventListener("input", (e) => {
  frequencyValue = e.currentTarget.value;
  console.log(frequencyValue);
});

quantityNumber.addEventListener("input", (ev) => {
  quantityValue = ev.currentTarget.value;
  console.log(quantityValue);
});

dosesNumber.addEventListener("input", (even) => {
  doseValue = even.currentTarget.value;
  console.log(doseValue);
});
dispensedDoses.addEventListener("input", (eve) => {
  dispensedDosesDrug = eve.currentTarget.value;
  console.log(dispensedDosesDrug);
});

function treatmentDaysCounting() {
  console.log(doseValue);
  console.log(quantityValue);
  console.log(frequencyValue);
  let dailyDose = frequencyValue * quantityValue;
  console.log(dailyDose);
  prescribedDaysTreatment = doseValue / dailyDose;
  daysTreatment.textContent = `Ilość dnia terapi na jakie przepisano leku: ${prescribedDaysTreatment}`;
}

countButton.addEventListener("click", (subbmit) => {
  subbmit.preventDefault();
  treatmentDaysCounting();
  dosesLeftCounting();
  nextDispensingDrug();
});

function dosesLeftCounting() {
  if (days > 30) {
    let daysTreatmentLeft = prescribedDaysTreatment - days.toFixed(0);
    if (daysTreatmentLeft > 0) {
      dosesLeft.textContent = `Ilość dni terapi na jakie można wydać lek: ${daysTreatmentLeft}`;
    } else {
      dosesLeft.textContent = "Nie można już wydać leku";
    }
  } else dosesLeft.textContent = "Można wydać całość przepisanego leku";
}

function nextDispensingDrug() {
  dispensedDaysTreatment =
    dispensedDosesDrug / (frequencyValue * quantityValue);

  oneThirdOfTime = (dispensedDaysTreatment / 4) * 3 * 86400000;
  daysToNextDispense = choosedDispenseDate + oneThirdOfTime;
  nextDispenseDate = new Date(daysToNextDispense);
  nextDispensing.textContent = `Następną porcję leku można wydać od dnia: ${nextDispenseDate.getDate()}. ${
    nextDispenseDate.getMonth() + 1
  }. ${nextDispenseDate.getFullYear()}`;
}
