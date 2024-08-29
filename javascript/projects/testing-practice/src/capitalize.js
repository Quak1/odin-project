function capitalize(s) {
  if (s === "") return "";
  else if (typeof s !== "string") throw new Error("String is required");

  return s[0].toUpperCase() + s.slice(1);
}

export default capitalize;
