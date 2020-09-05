const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 5;
ctx.strokeStyle = "#000000";

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
    // stop the function if they are not mouse down
    if (!isDrawing) return;
    //listen for mouse move event
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];

    const inputForSignature = document.querySelector("#signature");
    inputForSignature.value = canvas.toDataURL();
    //canvas.toDataURL());
    // set the value of input field to canvas value
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));

canvas.addEventListener("mouseout", () => (isDrawing = false));

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    let errors = [];
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const signature = document.querySelector("#signature").value;

    if (firstName === "") {
        errors.push("Please provide your first name");
    }
    if (lastName === "") {
        errors.push("Please provide your last name");
    }

    if (signature === "") {
        errors.push("Please sign the petition");
    }

    if (errors.length > 0) {
        event.preventDefault();
        const errorField = document.querySelector("#form-errors");
        errors.forEach((error) => {
            const li = document.createElement("li");
            li.textContent = error;
            errorField.append(li);
        });
    }
});
