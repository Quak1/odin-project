import { API_URL } from "./constants";

export default async (resource) => {
  const res = await fetch(`${API_URL}/${resource}`, { credentials: "include" });
  return await res.json();
};
