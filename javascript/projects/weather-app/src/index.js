import {
  render,
  isTempCelsius,
  setTempCelsius,
  showModal,
  closeModal,
} from "./view";
import { getWeather } from "./weather";
import "./style.css";

const form = document.querySelector("form");
const cityInput = form.querySelector("input");
const toggle = document.getElementById("toggle");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loadNewData(cityInput.value);
});

toggle.addEventListener("click", () => {
  setTempCelsius(toggle.checked);
  const city = document.querySelector("#weather-today .city");
  if (city) loadNewData(city.textContent);
});

async function loadNewData(city) {
  try {
    showModal("Loading...");

    const tempScale = isTempCelsius() ? "metric" : "us";
    const data = await getWeather(city, tempScale);
    render(data);
    cityInput.value = "";

    closeModal();
  } catch (e) {
    console.log(e);
    showModal("There was an error getting new data. " + e.message);
  }
}

showModal("Loading...");
getWeather("Paris", "metric")
  .then((data) => render(data))
  .then(closeModal);
