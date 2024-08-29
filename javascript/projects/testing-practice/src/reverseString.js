function reverseString(s) {
  if (s === "") return "";
  else if (typeof s !== "string") throw new Error("String is required");

  return s.split("").reverse().join("");
}

export default reverseString;
