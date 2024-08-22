const form = document.querySelector("form");
const cityInput = form.querySelector("input");
const submitBtn = form.querySelector("form button");

//form.addEventListener("submit", (e) => {
//  e.preventDefault();
//  getWeather(cityInput.value, "metric").then((data) => console.log(data));
//  cityInput.value = "";
//});

const weatherIcons = importWeatherIcons();
const cityElement = document.getElementById("city");
const tempElement = document.getElementById("temperature");
const dateElement = document.getElementById("date");
const iconElement = document.querySelector("#current-condition img");
const currentElement = document.querySelector("#current-condition p");
const hourlyElement = document.getElementById("hourly");
const weekElement = document.getElementById("weather-week");

function render(data) {
  drawToday(data);
  drawWeek(data);
}

function drawToday({ resolvedAddress, currentConditions, days }) {
  cityElement.textContent = resolvedAddress;
  tempElement.textContent = formatTemp(currentConditions.temp);
  dateElement.textContent = days[0].datetime;

  iconElement.alt = `${currentConditions.conditions} icon`;
  iconElement.src = weatherIcons[currentConditions.icon];
  currentElement.textContent = currentConditions.conditions;

  drawHours(days, 12);
}

function drawHours([today, tomorrow], startHour) {
  let hourData;
  if (startHour + 5 > 24) {
    hourData = [
      ...today.hours.slice(startHour),
      ...tomorrow.hours.slice(0, (startHour + 5) % 24),
    ];
  } else {
    hourData = today.hours.slice(startHour, startHour + 5);
  }

  const hours = hourData.map((hour) => makeHour(hour));
  hourlyElement.textContent = "";
  hourlyElement.append(...hours);
}

function makeHour(hour) {
  const temp = makeTextElement(formatTemp(hour.temp), "p");
  const time = makeTextElement(hour.datetime, "p");
  const period = makeTextElement("AM/PM", "p");

  const icon = document.createElement("img");
  icon.alt = `${hour.conditions} icon`;
  icon.src = weatherIcons[hour.icon];

  return makeContainer([temp, icon, time, period]);
}

function drawWeek({ days }) {
  const dayElements = days.slice(1, 7).map((day) => makeDay(day));
  weekElement.textContent = "";
  weekElement.append(...dayElements);
}

function makeDay(day) {
  const date = makeTextElement(day.datetime, "p");
  const precipitation = makeTextElement(day.precipprob, "p");
  const temps = makeTextElement(`${day.tempmin}° / ${day.tempmax}°`);

  const waterIcon = document.createElement("img");
  waterIcon.alt = "Precipitation probability icon";
  waterIcon.src = weatherIcons["water"];
  const precipitationContainer = makeContainer([precipitation, waterIcon]);

  const icon = document.createElement("img");
  icon.alt = `${day.conditions} icon`;
  icon.src = weatherIcons[day.icon];

  return makeContainer([date, precipitationContainer, icon, temps], "weekDay");
}

function makeTextElement(text, tag) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function makeContainer(content, className = "", tag = "div") {
  const container = document.createElement(tag);
  container.classList = className;
  container.append(...content);
  return container;
}

function formatTemp(temp, metric = true) {
  return `${temp}° ${metric ? "C" : "F"}`;
}

function importWeatherIcons() {
  const context = require.context("../icons", false, /\.svg$/);
  const icons = {};

  context.keys().forEach((key) => {
    const name = key.substring(2, key.length - 4);
    icons[name] = context(key);
  });

  return icons;
}

export { drawToday, render };
