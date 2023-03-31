const inputs = document.querySelectorAll("form input");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("confirm-password");

const comparePasswords = () => {
    if (passwordConfirm.value && password.value !== passwordConfirm.value) {
        password.classList.add("noMatch");
        passwordConfirm.classList.add("noMatch");
    } else {
        password.classList.remove("noMatch");
        passwordConfirm.classList.remove("noMatch");
    }
}

inputs.forEach(input => {
    input.addEventListener("focusout", () => {
        input.classList.add("required");
    }, { once: true });

    if (input.type === "password") {
        input.addEventListener("input", comparePasswords);
    }
});


let theme = "Light";
const toggleTheme = () => {
    theme = theme === "Dark" ? "Light" : "Dark";
    document.documentElement.className = theme;
    document.querySelector(".toggle-theme").textContent = theme;
}
toggleTheme();
document.querySelector(".toggle-theme").addEventListener("click", toggleTheme);
