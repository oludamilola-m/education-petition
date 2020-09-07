document.querySelector("#login-form").addEventListener("submit", (event) => {
    let errors = [];
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (email === "" || !validateEmail(email)) {
        errors.push("valid email");
    }
    if (password === "") {
        errors.push("password");
    }

    if (errors.length > 0) {
        event.preventDefault();
        const errorField = document.querySelector("#form-errors");
        errorField.innerHTML = "";
        errors.forEach((error) => {
            const li = document.createElement("li");
            li.textContent = `please enter ${error}`;
            errorField.append(li);
        });
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
