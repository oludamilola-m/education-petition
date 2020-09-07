const form = document.querySelector("#registration-form");
if (form) {
    form.addEventListener("submit", (event) => {
        let errors = [];
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        // const signature = document.querySelector("#signature").value;

        if (firstName === "") {
            errors.push("first name");
        }
        if (lastName === "") {
            errors.push("last name");
        }
        if (email === "") {
            errors.push("email");
        }
        if (password === "") {
            errors.push("password");
        }

        if (errors.length > 0) {
            event.preventDefault();
            const errorField = document.querySelector("#form-errors");
            errors.forEach((error) => {
                const li = document.createElement("li");
                li.textContent = `please enter ${error}`;
                errorField.append(li);
            });
        }
    });
}
