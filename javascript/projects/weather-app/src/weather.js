const api =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const key = "2T88MSEVCVADNM8B6CEF2WYTU";
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
  if (!response.ok)
    throw new Error(
      `Data couldn't be fetched with status code ${response.status}.`,
    );
  const data = await response.json();

  return data;
}

export { getWeather };
