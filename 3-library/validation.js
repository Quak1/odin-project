const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");

function addCustomValidity(target, event, msg) {
  target.addEventListener(event, (e) => {
    if (target.validity.valueMissing) {
      target.setCustomValidity(msg);
    } else {
      target.setCustomValidity("");
    }
  });
}

addCustomValidity(title, "focusout", "Please give a Title for this book");
addCustomValidity(author, "focusout", "Please give an Author for this book");
addCustomValidity(
  pages,
  "focusout",
  "Please give a number of Pages for this book",
);

console.log({ title, author, pages });
