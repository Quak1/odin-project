let tempScaleCelsius = true;
const weatherIcons = importWeatherIcons();
const cityElement = document.querySelector("#weather-today .city");
const tempElement = document.querySelector("#weather-today .temperature");
const dateElement = document.querySelector("#weather-today .date");
const iconElement = document.querySelector(".current-condition img");
const currentElement = document.querySelector(".current-condition p");
const hourlyElement = document.querySelector("#weather-today .hourly");
const weekElement = document.getElementById("weather-week");
const modal = document.querySelector("dialog");

function render(data) {
  drawToday(data);
  drawWeek(data);
}

function drawToday({ resolvedAddress, currentConditions, days }) {
  cityElement.textContent = resolvedAddress;
  tempElement.textContent = formatTemp(currentConditions.temp);
  dateElement.textContent = formateDateLong(days[0].datetime);

  iconElement.alt = `${currentConditions.conditions} icon`;
  iconElement.src = weatherIcons[currentConditions.icon];
  currentElement.textContent = currentConditions.conditions;

  drawHours(days, 12);
}

function drawHours([today, tomorrow], currentHour) {
  let hourData;
  const startHour = currentHour + 2;

  if (startHour >= 24) {
    hourData = [...tomorrow.hours.slice(startHour % 24, (startHour + 9) % 24)];
  } else if (startHour + 9 > 24) {
    hourData = [
      ...today.hours.slice(startHour),
      ...tomorrow.hours.slice(0, (startHour + 9) % 24),
    ];
  } else {
    hourData = today.hours.slice(startHour, startHour + 9);
  }

  hourData = hourData.filter((_, i) => i % 2 === 0);
  const hours = hourData.map((hour) => makeHour(hour));
  hourlyElement.textContent = "";
  hourlyElement.append(...hours);
}

function makeHour(hour) {
  const temp = makeTextElement(formatTemp(hour.temp), "p");
  const h = Number(hour.datetime.substring(0, 2));
  const format12Hour = h % 12 === 0 ? 12 : h % 12;
  const time = makeTextElement(format12Hour + ":00", "p");
  const period = makeTextElement(h >= 12 ? "PM" : "AM", "p");

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
  const date = makeTextElement(formatDateShort(day.datetime), "p");
  const precipitation = makeTextElement(day.precipprob + "%", "p");
  const temps = makeTextElement(`${day.tempmin}° / ${day.tempmax}°`, "p");

  const waterIcon = document.createElement("img");
  waterIcon.alt = "Precipitation probability icon";
  waterIcon.src = weatherIcons["water"];
  const precipitationContainer = makeContainer([precipitation, waterIcon]);

  const icon = document.createElement("img");
  icon.alt = `${day.conditions} icon`;
  icon.src = weatherIcons[day.icon];

  return makeContainer([date, precipitationContainer, icon, temps], "weekDay");
}

function showModal(text) {
  modal.textContent = text;
  modal.showModal();
}

function closeModal() {
  modal.close();
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

function formatTemp(temp) {
  return `${temp} °${tempScaleCelsius ? "C" : "F"}`;
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

function formateDateLong(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateShort(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });
}

function setTempCelsius(isCelcius) {
  tempScaleCelsius = isCelcius;
}

function isTempCelsius() {
  return tempScaleCelsius;
}

export { render, setTempCelsius, isTempCelsius, showModal, closeModal };
