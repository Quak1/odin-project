const form = document.querySelector("form");
const email = {
  name: "email address",
  input: document.getElementById("email"),
  error: document.querySelector("#email + span.error"),
};
const country = {
  name: "country",
  input: document.getElementById("country"),
  error: document.querySelector("#country + span.error"),
};
const postalCode = {
  name: "postal code",
  input: document.getElementById("zip"),
  error: document.querySelector("#zip + span.error"),
};
const password = {
  name: "password",
  input: document.getElementById("pwd"),
  error: document.querySelector("#pwd + span.error"),
};
const passwordConfirm = {
  name: "password",
  input: document.getElementById("pwd-confirm"),
  error: document.querySelector("#pwd-confirm + span.error"),
};

const postalTest = {
  CA: {
    pattern:
      /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    error: "Postal code must be in format A1A 1A1",
  },
  MX: {
    pattern: /^\d{5}$/,
    error: "Postal code must be 5 digits",
  },
  US: {
    pattern: /^\d{5}([- ]\d{4})?$/,
    error: "Zip code must be 5 digits or ZIP+4",
  },
};

function getErrorMsgFunction(target, testFunction, missingMsg) {
  return function () {
    if (target.validity.valueMissing) return missingMsg;
    const errorMsg = testFunction(target);
    if (errorMsg) return errorMsg;
  };
}

function testEmail(target) {
  if (target.validity.typeMismatch) {
    return "Please enter a valid email address";
  }
}

function testPostalCode(target) {
  const countryCode = country.input.value;

  if (!countryCode) {
    return "Please select a country first";
  } else if (!postalTest[countryCode].pattern.test(target.value)) {
    return postalTest[countryCode].error;
  }
}

function testPassword(target) {
  const pwd = target.value;
  const errorList = [];

  if (pwd.length < 5) errorList.push("5 characters");
  if (!/\d/.test(pwd)) errorList.push("1 number");
  if (!/[a-z]/.test(pwd)) errorList.push("1 lowercase letter");
  if (!/[A-Z]/.test(pwd)) errorList.push("1 uppercase letter");

  if (errorList.length === 0) return;

  function createElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
  }

  const container = createElement("div", "Password is missing at least:");
  const list = document.createElement("ul");
  list.append(...errorList.map((msg) => createElement("li", msg)));
  container.append(list);

  return container;
}

function testPasswordConfirmation(target) {
  if (target.value !== password.input.value) {
    return "Password confirmation does not match password";
  }
}

function setListener(target, testFunction, missingMsg) {
  const getErrorMsg = getErrorMsgFunction(
    target.input,
    testFunction,
    missingMsg,
  );

  function setErrorMsg() {
    const errorMsg = getErrorMsg();
    if (!errorMsg) {
      target.error.textContent = "";
      target.error.classList.remove("active");
    } else {
      target.error.textContent = "";
      target.error.append(errorMsg);
      target.error.classList.add("active");
    }
  }

  target.input.addEventListener("input", setErrorMsg);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setErrorMsg();
  });
}

setListener(email, testEmail, "An email addess is required");
setListener(country, () => {}, "Please select a country");
setListener(postalCode, testPostalCode, "Please enter a postal code");
setListener(password, testPassword, "Please enter a password");
setListener(
  passwordConfirm,
  testPasswordConfirmation,
  "Please enter a password",
);

form.addEventListener("submit", () => {
  const errorSpan = document.querySelector("span.error.active");
  if (!errorSpan) {
    email.input.value = "";
    country.input.value = "";
    postalCode.input.value = "";
    password.input.value = "";
    passwordConfirm.input.value = "";

    alert("High five!");
    email.input.focus();
  }
});
