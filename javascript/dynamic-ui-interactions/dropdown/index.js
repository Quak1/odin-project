const dropdown = document.querySelector(".dropdown");
const dropdownItems = dropdown.querySelector(".items");

function toggleDropdown() {
  dropdownItems.classList.toggle("show");
}

dropdown.querySelector("button").addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.documentElement.addEventListener("click", () => {
  if (dropdownItems.classList.contains("show")) toggleDropdown();
});
