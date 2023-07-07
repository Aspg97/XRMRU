//INICIO PROCESO >> inicializacion del grafico con canvas
const canvas = document.getElementById("canvas");
const pincel = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let espX = 30;
function ini() {
    pincel.lineWidth = 1;
    // EjeY
    pincel.beginPath();
    pincel.moveTo(35, 0);
    pincel.lineTo(35, canvas.height);
    pincel.stroke();
    pincel.closePath();
    // EjeY > direccion+
    pincel.beginPath();
    pincel.moveTo(35, 0);
    pincel.lineTo(38, 10);
    pincel.lineTo(32, 10);
    pincel.fill();
    pincel.closePath();
    // EjeY > direccion-
    pincel.beginPath();
    pincel.moveTo(35, canvas.height);
    pincel.lineTo(38, canvas.height - 10);
    pincel.lineTo(32, canvas.height - 10);
    pincel.fill();
    pincel.closePath();
    // EjeX
    pincel.beginPath();
    pincel.moveTo(0, canvas.height - espX);
    pincel.lineTo(canvas.width, canvas.height - espX);
    pincel.stroke();
    pincel.closePath();
    // EjeX > direccion-
    pincel.beginPath();
    pincel.moveTo(0, canvas.height - espX);
    pincel.lineTo(10, canvas.height - (espX + 3));
    pincel.lineTo(10, canvas.height - (espX - 3));
    pincel.fill();
    pincel.closePath();
    // EjeX > direccion+
    pincel.beginPath();
    pincel.moveTo(canvas.width, canvas.height - espX);
    pincel.lineTo(canvas.width - 10, canvas.height - (espX + 3));
    pincel.lineTo(canvas.width - 10, canvas.height - (espX - 3));
    pincel.fill();
    pincel.closePath();
    // Letra Eje Y
    pincel.font = "12px Arial";
    pincel.fillText("x(m)", 7, 20);
    // Letra Eje X
    pincel.fillText("t(s)", canvas.width - 20, canvas.height - 7);
    // Valor de origen
    pincel.fillText("0", 20, canvas.height - 7);
}
//FIN PROCESO >> inicializacion del grafico con canvas
//INICIO PROCESO >> dibujar numeros
//Dibujar numeros > EjeY
const linNumY = ({ porcentaje = 0, etinum = 1 }) => ({
    x1: 30,
    y1: (((canvas.height - 80) / 100) * porcentaje) + (canvas.height - espX),
    x2: 40,
    y2: (((canvas.height - 80) / 100) * porcentaje) + (canvas.height - espX),
    etinum,
    fontSS: "12px Arial",
    dibujarNumero() {
        pincel.beginPath();
        pincel.moveTo(this.x1, this.y1);
        pincel.lineTo(this.x2, this.y2);
        pincel.stroke();
        pincel.closePath();
        pincel.font = this.fontSS;
        pincel.fillText(etinum, this.x1 - 25, this.y1 + 4);
    }
});
//Dibujar numeros > EjeX
const linNumX = ({ porcentaje = 20, etinum = 1 }) => ({
    x1: (((canvas.width - 80) / 100) * porcentaje) + 35,
    y1: canvas.height - (espX + 5),
    x2: (((canvas.width - 80) / 100) * porcentaje) + 35,
    y2: canvas.height - (espX - 5),
    etinum,
    fontSS: "12px Arial",
    dibujarNumero() {
        pincel.beginPath();
        pincel.moveTo(this.x1, this.y1);
        pincel.lineTo(this.x2, this.y2);
        pincel.stroke();
        pincel.closePath();
        pincel.font = this.fontSS;
        pincel.fillText(etinum, this.x2 - 5, this.y1 + 30);
    }
});
//FIN PROCESO >> dibujar numeros
//INICIO PROCESO >> nomenclatura de punto del segmento
const componentesSegmento = ({ letra = 'a', px = 0, py = 0, subIndi}) => ({
    letra,
    subIndi,
    x: (((canvas.width - 80) / 100) * px) + 22,
    y: (((canvas.height - 80) / 100) * py) + (canvas.height - (espX + 5)),
    fontSS: "15px Arial",
    fontVector:"20px SansSerif",
    fontSubVector:"12px SansSerif",
    dibujarLetra() {
        pincel.beginPath();
        pincel.fillStyle = "#14A420";
        pincel.font = this.fontSS;
        pincel.fillText(this.letra, this.x, this.y);
        pincel.closePath();
    },
    dibujarPunto() {
        pincel.beginPath();
        pincel.fillStyle = "#034492";
        pincel.arc(this.x + 13, this.y + 5, 3, 0, 2 * Math.PI, false);
        pincel.fill();
        pincel.closePath();
    },
    dibujarLetraVelocidad() {
        pincel.beginPath();
        pincel.fillStyle = "red";
        pincel.strokeStyle = "red";
        pincel.font = this.fontVector;
        pincel.fillText(this.letra, this.x, this.y);
        pincel.strokeText(this.letra, this.x, this.y);
        pincel.font = this.fontSubVector;
        pincel.fillText(this.subIndi, this.x+15, this.y);
        pincel.strokeText(this.subIndi, this.x+15, this.y);
        pincel.closePath();
    }
});
//FIN PROCESO >> nomenclatura de punto del segmento
//INICIO PROCESO >> dibujar segmento
const segmento = ({ px1 = 0, py1 = 0, px2 = 50, py2 = 50 }) => ({
    x1: (((canvas.width - 80) / 100) * px1) + 35,
    y1: (((canvas.height - 80) / 100) * py1) + (canvas.height - espX),
    x2: (((canvas.width - 80) / 100) * px2) + 35,
    y2: (((canvas.height - 80) / 100) * py2) + (canvas.height - espX),
    dibujarSegmento() {
        pincel.beginPath();
        pincel.strokeStyle = "#0070C2";
        pincel.moveTo(this.x1, this.y1);
        pincel.lineTo(this.x2, this.y2);
        pincel.stroke();
        pincel.closePath();
    }
});
//FIN PROCESO >> dibujar segmento
//INICIO PROCESO >> dibujar lineas guias
const guias = ({ lcx = 1000, ancx1 = 0, ancy1 = -20, guia = "y" }) => ({
    limitecX: (((canvas.width - 80) / 100) * lcx),
    recorrido: 0,
    anchoLinea: 5,
    espacio: 10,
    x1: (((canvas.width - 80) / 100) * ancx1) + 35,
    y1: (((canvas.height - 80) / 100) * ancy1) + (canvas.height - espX),
    guia,
    dibujarGuias() {
        if (this.guia === "y") {
            this.dibujarGuiasY();
        } else {
            this.dibujarGuiasX();
        }
    },
    dibujarGuiasY() {
        while (this.recorrido < this.limitecX) {
            pincel.beginPath();
            pincel.strokeStyle = "#999";
            pincel.lineWidth = 0.3;
            pincel.moveTo(this.x1 + this.anchoLinea, this.y1);
            pincel.lineTo(this.x1, this.y1);
            pincel.stroke();
            pincel.closePath();
            this.x1 += this.espacio;
            this.recorrido += this.espacio;
        }
    },
    dibujarGuiasX() {
        this.recorrido = this.y1;
        while (this.recorrido < canvas.height - espX) {
            pincel.beginPath();
            pincel.strokeStyle = "#999";
            pincel.lineWidth = 0.3;
            pincel.moveTo(this.x1, this.y1);
            pincel.lineTo(this.x1, this.y1 + this.anchoLinea);
            pincel.stroke();
            pincel.closePath();
            this.y1 += this.espacio;
            this.recorrido += this.espacio;
        }
    }
});
//FIN PROCESO >> dibujar lineas guias
//>> Funcion descargar Canvas
function descargarCanvas(canvas) {
    const canvasTemp = document.createElement("canvas");
    canvasTemp.width = canvas.width;
    canvasTemp.height = canvas.height;
    const ctx = canvasTemp.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvasTemp.width, canvasTemp.height);
    ctx.drawImage(canvas, 0, 0);
    let enlace = document.createElement('a');
    enlace.download = "gráfica-dvst.jpg";
    enlace.href = canvasTemp.toDataURL("image/jpg", 1);
    enlace.click();
}