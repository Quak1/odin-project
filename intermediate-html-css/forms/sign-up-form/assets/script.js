const inputs = document.querySelectorAll("form input");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("confirm-password");

const comparePasswords = () => {
    if (password.value === passwordConfirm.value) {
        password.classList.remove("noMatch");
        passwordConfirm.classList.remove("noMatch");
    } else {
        password.classList.add("noMatch");
        passwordConfirm.classList.add("noMatch");
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


