//INICIO PROCESO >> inicializacion del grafico con canvas
function ini() {
    const canvas = document.getElementById("canvas");
    const pincel = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 400;
    pincel.strokeStyle = "#000";
    pincel.lineWidth = 1;
    // EjeX
    pincel.beginPath();
    pincel.moveTo(25, 0);
    pincel.lineTo(25, canvas.height);
    pincel.stroke();
    pincel.closePath();
    // EjeX > direccion+
    pincel.fillStyle = "#000"
    pincel.beginPath();
    pincel.moveTo(25, 0);
    pincel.lineTo(28, 10);
    pincel.lineTo(22, 10);
    pincel.fill();
    pincel.closePath();
    // EjeX > direccion-
    pincel.fillStyle = "#000"
    pincel.beginPath();
    pincel.moveTo(25, canvas.height);
    pincel.lineTo(28, canvas.height - 10);
    pincel.lineTo(22, canvas.height - 10);
    pincel.fill();
    pincel.closePath();
    // EjeY
    pincel.beginPath();
    pincel.moveTo(0, canvas.height - 25);
    pincel.lineTo(canvas.width, canvas.height - 25);
    pincel.stroke();
    pincel.closePath();
    // EjeY > direccion+
    pincel.fillStyle = "#000"
    pincel.beginPath();
    pincel.moveTo(0, canvas.height - 25);
    pincel.lineTo(10, canvas.height - 28);
    pincel.lineTo(10, canvas.height - 22);
    pincel.fill();
    pincel.closePath();
    // EjeY > direccion-
    pincel.fillStyle = "#000"
    pincel.beginPath();
    pincel.moveTo(canvas.width, canvas.height - 25);
    pincel.lineTo(canvas.width - 10, canvas.height - 28);
    pincel.lineTo(canvas.width - 10, canvas.height - 22);
    pincel.fill();
    pincel.closePath();
    // Letra Eje Y
    pincel.font = "12px Arial";
    pincel.fillText("Y", 10, 20);
    // Letra Eje X
    pincel.font = "12px Arial";
    pincel.fillText("X", canvas.width - 20, canvas.height - 7);
    // Valor de origen
    pincel.font = "12px Arial";
    pincel.fillText("0", 10, canvas.height - 7);
}
//FIN PROCESO >> inicializacion del grafico con canvas