import { toast, Slide } from "react-toastify";

import { API_URL } from "./config/constants";
import style from "./components/styles/Toast.module.css";

export const fetchData = async (resource) => {
  const res = await fetch(`${API_URL}/${resource}`, { credentials: "include" });
  return await res.json();
};

export const postData = async (resource, data) => {
  const url = new URL(`${API_URL}/${resource}`);
  url.search = new URLSearchParams(data);

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
  });

  if (res.ok) return await res.json();
  else if (res.status === 400) return { error: (await res.json()).error.msg };
  else return { error: "There was an error submitting your score." };
};

export const formatMinutes = (millis) => {
  const minutes = Math.floor(millis / 60 / 1000);
  const seconds = Math.floor(millis / 1000) % 60;

  return `${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)}`;
};

export const formatMillis = (millis) => {
  return `${formatMinutes(millis)}.${millis % 1000}`;
};

export const formatDate = (d) => {
  const date = new Date(d).toLocaleDateString("en-ZA");
  return date;
};

const formatTimeComponent = (t) => (t < 10 ? `0${t}` : t);

export const notify = (msg, type = "success") => {
  toast(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    transition: Slide,
    className: style.toast,
    type: type,
  });
};

export const notifyFatal = (msg, type = "error") => {
  toast(msg, {
    hideProgressBar: true,
    autoClose: false,
    transition: Slide,
    theme: "colored",
    type: type,
  });
};
