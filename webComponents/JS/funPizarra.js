const canvas = document.querySelector("canvas"),
    pantCompl = document.querySelector(".pantalla-completa"),
    pizarron = document.getElementById("cont-pizarra"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".clear-canvas"),
    saveImg = document.querySelector(".save-img"),
    ctx = canvas.getContext("2d");

const canvasText = document.createElement("canvas");
const ctxText = canvasText.getContext("2d");

let prevMouseX, prevMouseY, snapshot, lineTextX, lineTextY,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#fff";


window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvasText.width = canvas.offsetWidth;
    canvasText.height = canvas.offsetHeight;
    if (dispDetected()) {
        alert("Para hacer uso de la pizarra digital utiliza una computadora o laptop");
    }

});

const drawRect = (e) => {
    if (!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

let texto = "",
    fullEra = false;
const writeText = (e) => {
    let cont = 0;
    cont++;
    console.log("borra >>> " + (lineTextX - 1) + "," + (lineTextY - 1) + "," + (lineTextX + 1) + "," + (lineTextY + 27));
    ctx.clearRect(lineTextX - 1, lineTextY - 1, 2, 27);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#fff";
    lineTextX = e.offsetX;
    lineTextY = e.offsetY - 15;
    ctx.moveTo(lineTextX, lineTextY);
    ctx.lineTo(lineTextX, lineTextY + 26);
    ctx.stroke();
    ctx.closePath();
    console.log("hace >>> " + (lineTextX) + "," + (lineTextY) + "," + (lineTextX) + "," + (lineTextY + 26));
    console.log(cont);
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawLine = (e)=>{
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked = ctx.stroke();
}

const startDraw = (e) => {
    ctx.font = "26px Arial";
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if (!isDrawing) return;
    switch (selectedTool) {
        case "brush":
            ctx.putImageData(snapshot, 0, 0);
            ctx.strokeStyle = selectedColor;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            break;
        case "line":
            console.log("rayar");
            ctx.putImageData(snapshot, 0, 0);
            drawLine(e);
            break;
        case "eraser":
            ctx.clearRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
            break;
        case "rectangle":
            ctx.putImageData(snapshot, 0, 0);
            drawRect(e);
            break;
        case "circle":
            ctx.putImageData(snapshot, 0, 0);
            drawCircle(e);
            break;
        case "triangle":
            ctx.putImageData(snapshot, 0, 0);
            drawTriangle(e);
            break;
    }
}
const text = (e) => {
    if (texto != "") {
        const elimBarra = ctx.measureText(texto).width;
        ctx.clearRect(lineTextX + elimBarra + 2, lineTextY, 2, 27);
    }
    if (fullEra === true) {
        ctx.clearRect(lineTextX - 1, lineTextY - 1, 5, 27);
    }
    texto = "";
    if (selectedTool === "text") {
        writeText(e);
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        ctx.clearRect(lineTextX - 1, lineTextY - 1, 2, 27);
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        if (selectedTool === "text") {
            canvas.style.cursor = "text";
        } else {
            canvas.style.cursor = "auto";
            const elimBarra = ctx.measureText(texto).width;
            ctx.clearRect(lineTextX + elimBarra + 2, lineTextY, 2, 27);
            lineTextX = 0;
            lineTextY = 0;
        }
    });
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
});


canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("click", text);

document.addEventListener("keydown", (e) => {
    if (selectedTool === "text") {
        ctx.clearRect(lineTextX - 1, lineTextY - 1, 2, 27);
        if (e.key === "Backspace") {
            const textWidth = ctx.measureText(texto).width;
            ctx.clearRect(lineTextX, lineTextY, textWidth + 4, 30);
            texto = texto.substring(0, texto.length - 1);
            ctx.fillText(texto, lineTextX, lineTextY + 25);
            const textWidthB = ctx.measureText(texto).width;
            ctx.beginPath();
            ctx.moveTo(lineTextX + textWidthB + 3, lineTextY);
            ctx.lineTo(lineTextX + textWidthB + 3, lineTextY + 26);
            ctx.stroke();
            ctx.closePath();
            if (texto === "") {
                fullEra = true;
            }
        } else {
            if (e.key === " ") {
                e.preventDefault();
            }
            if (e.key.length === 1) {
                console.log(e.key);
                texto = texto + e.key;
                const textWidth = ctx.measureText(texto).width;
                ctx.clearRect(lineTextX, lineTextY, textWidth, 30);
                ctx.beginPath();
                ctx.fillStyle = selectedColor;
                ctx.fillText(texto, lineTextX, lineTextY + 25);
                ctx.closePath();
                ctx.beginPath();
                ctx.moveTo(lineTextX + textWidth + 3, lineTextY);
                ctx.lineTo(lineTextX + textWidth + 3, lineTextY + 26);
                ctx.stroke();
                ctx.closePath();
                fullEra = false;
            }
        }
    }
});