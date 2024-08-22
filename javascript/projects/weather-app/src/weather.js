const api =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const key = "";
const include = "current,hours,days";
const elements = [
  "conditions",
  "icon",
  "temp",
  "datetime",
  "precipprob",
  "tempmin",
  "tempmax",
];
const opts = `include=${include}&elements=${elements.join(",")}&contentType=json`;

async function getWeather(city, units) {
  const response = await fetch(
    `${api}/${city}?key=${key}&unitGroup=${units}&${opts}`,
  );
  const data = await response.json();
  return data;
}

export { getWeather };
