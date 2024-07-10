const myLibrary = [];
let id = 0;

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
};

Book.prototype.infoArray = function () {
  return [this.title, this.author, this.pages];
};

function addBookToLibrary(title, author, pages, read = false) {
  const newBook = new Book(title, author, pages, read, id++);
  myLibrary.push(newBook);
  addBookToTable(newBook);
}

function addBookToTable(book) {
  const row = document.createElement("tr");
  row.dataset.id = book.id;

  for (const data of book.infoArray()) {
    const cell = document.createElement("td");
    cell.innerText = data;
    row.appendChild(cell);
  }

  let cell = document.createElement("td");
  cell.classList.add("center");
  const readBtn = document.createElement("button");
  readBtn.addEventListener("click", toggleRead);
  readBtn.classList.add("imgBtn", "readBtn", book.read ? "read" : "notread");
  cell.appendChild(readBtn);
  row.appendChild(cell);

  cell = document.createElement("td");
  cell.classList.add("center");
  const deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", deleteBook);
  deleteBtn.classList.add("imgBtn", "deleteBtn");
  cell.appendChild(deleteBtn);
  row.appendChild(cell);

  table.appendChild(row);
}

function getBookIndex(e) {
  const row = e.target.parentElement.parentElement;
  const bookId = row.dataset.id;
  const bookIndex = myLibrary.findIndex((book) => bookId == book.id);
  return bookIndex;
}

function deleteBook(e) {
  const bookIndex = getBookIndex(e);
  myLibrary.splice(bookIndex, 1);
  e.target.parentElement.parentElement.remove();
}

function toggleRead(e) {
  const bookIndex = getBookIndex(e);
  const isRead = myLibrary[bookIndex].read;

  const btnClass = e.target.classList;
  if (isRead) btnClass.add("notread");
  else btnClass.remove("notread");

  myLibrary[bookIndex].read = !isRead;
}

const table = document.querySelector("#books-table tbody");
const dialog = document.querySelector("dialog");
const submitBtn = document.querySelector("dialog button");
const form = document.querySelector("form");
const addBookBtn = document.getElementById("newBookBtn");
const cancelBtn = document.getElementById("cancelBtn");

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1077, true);
addBookToLibrary("The Silmarillion", "J.R.R. Tolkien", 365, false);

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;
  addBookToLibrary(title, author, pages, read);

  dialog.close();
});

dialog.addEventListener("close", () => {
  form.reset();
});
