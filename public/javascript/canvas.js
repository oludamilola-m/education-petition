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
