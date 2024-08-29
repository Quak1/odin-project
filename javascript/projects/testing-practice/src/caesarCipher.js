function shiftNumber(num, shift, start, size = 26) {
  return ((num - start + shift) % size) + start;
}

function shiftChar(char, k) {
  if (char >= "a" && char <= "z") {
    return String.fromCharCode(shiftNumber(char.charCodeAt(), k, 97));
  } else if (char >= "A" && char <= "Z") {
    return String.fromCharCode(shiftNumber(char.charCodeAt(), k, 65));
  } else {
    return char;
  }
}

function caesarCipher(s, k) {
  return s
    .split("")
    .map((c) => shiftChar(c, k))
    .join("");
}

export default caesarCipher;
