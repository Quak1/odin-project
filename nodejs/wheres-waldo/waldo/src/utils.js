import { API_URL } from "./config/constants";

export const fetchData = async (resource) => {
  const res = await fetch(`${API_URL}/${resource}`, { credentials: "include" });
  return await res.json();
};

export const postData = async (resource) => {
  const res = await fetch(`${API_URL}/${resource}`, {
    method: "POST",
    credentials: "include",
  });
  return await res.json();
};

export const formatMinutes = (millis) => {
  const minutes = Math.floor(millis / 60 / 1000);
  const seconds = Math.floor(millis / 1000) % 60;

  return `${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)}`;
};

export const formatMillis = (millis) => {
  return `${formatMinutes(millis)}.${millis % 1000}`;
};

const formatTimeComponent = (t) => (t < 10 ? `0${t}` : t);
