const routeSelect = document.getElementById("route");
const timeSelect = document.getElementById("time");
const timeRevSelect = document.getElementById("timeReverse");
const comeBack = document.getElementById("comeBack");
const input = document.getElementById("input");
const button = document.getElementById("button");
///////////////РАСПИСАНИЕ///////////////////
const dates = [
  new Date(2021, 7, 21, 18),
  new Date(2021, 8, 21, 18, 30),
  new Date(2021, 8, 21, 18, 45),
  new Date(2021, 8, 21, 19),
  new Date(2021, 8, 21, 19, 15),
  new Date(2021, 8, 21, 19, 35),
  new Date(2021, 8, 21, 21),
];
const reverseDates = [
  new Date(2021, 8, 21, 21, 55),
  new Date(2021, 8, 21, 21),
  new Date(2021, 8, 21, 19, 35),
  new Date(2021, 8, 21, 19, 15),
  new Date(2021, 8, 21, 19),
  new Date(2021, 8, 21, 18, 45),
  new Date(2021, 8, 21, 18, 30),
];

let sum = 1080;
let sumComeBack;
let filteredDates;
let hours = 18;
let minutes = 00;
let revHours = 21;
let revMinutes = 55;
let thirdHours;
let thirdMinutes;
const modernReverseDates = reverseDates.map(
  (date) => date.getHours() * 60 + date.getMinutes()
);

timeSelect.onchange = function setChange(sel) {
  let val = sel.target.value;
  hours = val.split(" ")[0].slice(0, 2);
  minutes = val.split(" ")[0][3] + val.split(" ")[0][4];
  let numMinutes = Number(minutes);
  let numHours = Number(hours) * 60;
  sum = numHours + numMinutes;
  filteredDates = modernReverseDates.filter((item) => item > sum + 50);
  comeBack.innerHTML = "";
  filteredDates.map((item, index) => {
    item = `${reverseDates[index].getHours()}:${
      reverseDates[index].getMinutes() ? reverseDates[index].getMinutes() : "00"
    }`;
    let option = document.createElement("option");
    option.innerText = item;

    comeBack.append(option);
  });

  console.log(filteredDates);
  return sum;
};
comeBack.onchange = function setChange(sel) {
  let val = sel.target.value;
  revHours = val.split(" ")[0].slice(0, 2);
  revMinutes = val.split(" ")[0][3] + val.split(" ")[0][4];
};
timeRevSelect.onchange = function setChange(sel) {
  let val = sel.target.value;
  thirdHours = val.split(" ")[0].slice(0, 2);
  thirdMinutes = val.split(" ")[0][3] + val.split(" ")[0][4];
};
/////////////ФУНКЦИИ/////////////////////////

function sendInfoFirst() {
  alert(`Вы выбрали ${
    input.value
  } билета по маршруту из A в B и обратно стоимостью ${input.value * 1200}.
Это путешествие займет у вас 1 час 40 минут. 
Теплоход отправляется в ${hours}:${minutes}, а прибудет в ${
    Number(minutes) < 10
      ? `${Number(hours)}:${Number(minutes) + 50}`
      : `${Number(hours) + 1}:${Number(minutes) + 50 - 60}`
  }
Отправление назад состоится в ${revHours}: ${revMinutes}, а прибудет в ${
    Number(revMinutes) < 10
      ? `${Number(revHours)}:${Number(revMinutes) + 50}`
      : `${Number(revHours) + 1}:${Number(revMinutes) + 50 - 60}`
  }
`);
}
function sendInfoSecond() {
  alert(`Вы выбрали ${input.value} билета по маршруту из A в B  стоимостью ${
    input.value * 700
  }.
Это путешествие займет у вас 50 минут. 
Теплоход отправляется в ${hours}:${minutes}, а прибудет в ${
    Number(minutes) < 10
      ? `${Number(hours)}:${Number(minutes) + 50}`
      : `${Number(hours) + 1}:${Number(minutes) + 50 - 60}`
  }
`);
}
function sendInfoThird() {
  alert(`Вы выбрали ${input.value} билета по маршруту из В в А  стоимостью ${
    input.value * 700
  }.
Это путешествие займет у вас 50 минут. 
Теплоход отправляется в ${thirdHours}:${thirdMinutes}, а прибудет в ${
    Number(thirdMinutes) < 10
      ? `${Number(thirdHours)}:${Number(thirdMinutes) + 50}`
      : `${Number(thirdHours) + 1}:${Number(thirdMinutes) + 50 - 60}`
  }
`);
}
/////////////////ПОКАЗ ЭЛЕМЕНТОВ В ЗАВИСИМОСТИ ОТ УСЛОВИЙ////////////////
routeSelect.onchange = function () {
  const value = routeSelect.value;
  if (value == "из A в B и обратно в А") {
    timeSelect.classList.add("show");
    timeRevSelect.classList.remove("show");
    comeBack.classList.add("show");
    button.onclick = sendInfoFirst;
  } else if (value == "из B в A") {
    timeRevSelect.classList.add("show");
    timeSelect.classList.add("disabled");
    timeSelect.classList.remove("show");
    comeBack.classList.remove("show");
    button.onclick = sendInfoThird;
  } else {
    timeSelect.classList.add("show");
    timeRevSelect.classList.remove("show");
    comeBack.classList.remove("show");

    button.onclick = sendInfoSecond;
  }
};

const revOptions = reverseDates.map((date) => {
  let option = document.createElement("option");
  option.innerText = `${date.getHours()}:${
    date.getMinutes() ? date.getMinutes() : "00"
  }(из B в A)`;
  timeRevSelect.append(option);
  return option.value;
});
const options = dates.map((date) => {
  let option = document.createElement("option");
  option.innerText = `${date.getHours()}:${
    date.getMinutes() ? date.getMinutes() : "00"
  }(из A в B)`;
  timeSelect.append(option);
});
