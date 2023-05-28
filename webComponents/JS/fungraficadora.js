const btnAuto = document.getElementById("btn-auto");
const btnPerf = document.getElementById("btn-per");
const btnGen = document.getElementById("gen-graph");
const contDateGraph = document.querySelector(".cont-date-graph");
const contInfoGraph = document.querySelector(".cont-info-graph");
const contGraph = document.querySelector(".cont-graph");

ini(); // Inicializacion de canvas
var slcAuto = true; // Variable para seleccion de modo
//INICIO PROCESO >> cuando el usuario selecciona personalizado
btnPerf.addEventListener("click", () => {
    slcAuto = true;
    btnSelected(slcAuto);
    /*  Queda pendiente el movimiento del canvas controlado con transition
    contGraph.style.position = "absolute";
    contGraph.style.left = ((contDateGraph.clientWidth / 2) - 365) + "px";
    contGraph.style.left = contDateGraph.clientWidth - 730 + "px"*/
    contInfoGraph.style.display = "inline-block";
    contInfoGraph.style.width = contDateGraph.clientWidth - 750 + "px";
    contInfoGraph.style.animation = "transparenciaActive 0.3s";

});
//FIN PROCESO >> cuando el usuario selecciona personalizado
//INICIO PROCESO >> cuando el usuario selecciona automatico
btnAuto.addEventListener("click", () => {
    slcAuto = false;
    btnSelected(slcAuto);
    contGraph.style.left = ((contDateGraph.clientWidth / 2) - 365) + "px";
    contInfoGraph.removeAttribute("style");
});
//FIN PROCESO >> cuando el usuario selecciona automatico
//INICIO PROCESO >> estilo seleccion tipo de generar
function btnSelected(auto) {
    if (auto == true) {
        btnAuto.style.borderBottom = "none";
        btnPerf.style.borderBottom = "solid 5px #034492";
    } else {
        btnPerf.removeAttribute("style");
        btnAuto.setAttribute("style", "border-bottom: solid 5px var(--first-color);");
    }
}
//FIN PROCESO >> estilo seleccion tipo de generar
//INICIO PROCESO >> accion del boton generar
var numSeg = 5;
btnGen.addEventListener("click", () => {
    pincel.fillStyle = "#000";
    pincel.strokeStyle = "#000";
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    let numY = 5;
    let numX = 8;
    ini();
    //Ingreso valores een recta
    const valoresY = llenarDatos(numY); //Ingreso valores een recta > Eje Y
    const valoresX = llenarDatos(numX);  //Ingreso valores een recta > Eje X
    //impresion de valores
    dibujarDatos(numY, valoresY, "Y"); //Impresion de valores > Eje Y
    dibujarDatos(numX, valoresX, "X"); //Impresion de valores > Eje X
    //Preparacion para graficar
    let letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]; //Preparacion para graficar > letras para nodos de segmento
    let cy = []; // arreglo para las coordenadas de Y
    //Preparacion para graficar > Se llenan espacios aleatorios entre 0 y 7 con los elementos del vector de Y
    for (let i = 0; i < numY; i++) {
        rn = Math.floor(Math.random() * ((numX - 1) - 0 + 1)) + 0;
        if (cy[rn] == null) {
            cy[rn] = valoresY[0][i];
        } else {
            i--;
        }
    }
    //Preparacion para graficar > Se llenan los espacios vacios del vector de coordenadas de y "cy"
    for (let i = 0; i < numX; i++) {
        if (cy[0] == null) {
            cy[0] = valoresY[0][Math.floor(Math.random() * ((numY - 1) - 0 + 1)) + 0]
        } else if (cy[i] == null) {
            cy[i] = cy[i - 1];
        }
    }
    // Imprimir Segmento
    for (let i = 0; i < numX; i++) {
        if (i == 0) {
            const dibSegmento = segmento({
                px1: 0,
                py1: 0,
                px2: valoresX[0][i] * 100 / valoresX[1],
                py2: -cy[i] * 100 / valoresY[1]
            });
            dibSegmento.dibujarSegmento();
        }else {
            const dibSegmento = segmento({
                px1: valoresX[0][i-1] * 100 / valoresX[1],
                py1: -cy[i-1] * 100 / valoresY[1],
                px2: valoresX[0][i] * 100 / valoresX[1],
                py2: -cy[i] * 100 / valoresY[1]
            });
            dibSegmento.dibujarSegmento();
        }
    }
    //Imprimir letra de segmento
    //Imprimir letra de segmento > con datos obtenidos de "cy" y los valores del vector de x
    for (let i = 0; i < numX + 1; i++) {
        if (i == 0) {
            const letraIni = componentesSegmento({
                letra: letras[i],
                px: 0,
                py: 0
            });
            letraIni.dibujarLetra();
            letraIni.dibujarPunto();
        } else {
            const letra = componentesSegmento({
                letra: letras[i],
                px: valoresX[0][i - 1] * 100 / valoresX[1],
                py: -cy[i - 1] * 100 / valoresY[1]
            });
            letra.dibujarLetra();
            letra.dibujarPunto();
        }
    }
    //Imprimir lineas guias
    
});
//FIN PROCESO >> accion del boton generar
//INICIO PROCESO >> funcion llenar datos de ejes
function llenarDatos(numObj) {
    let array = [numObj], numM = 0;
    for (let i = 0; i < numObj; i++) {
        array[i] = Math.round(Math.random() * 100);
        for (let j = i - 1; j >= 0; j--) { // bucle para comparar los numero ingresado con los anteriores
            if (Math.abs(array[i] - array[j]) < 5) { // validacion por si los numeros estan menos de 5 unidaddes cerca
                //console.log(array[i] + "->" + array[j]);
                i--;
            }
        }
        if (array[i] > numM) {
            numM = array[i];
        }
    }
    array.sort((a, b) => a - b);
    return [array, numM];
}
//FIN PROCESO >> funcion llenar datos de ejes
//INICIO PROCESO >> funcion imprimir datos de ejes
function dibujarDatos(numObj, valores, eje) {
    switch (eje) {
        case "Y":
            for (let i = 0; i < numObj; i++) {
                const dibnumY = linNumY({
                    porcentaje: -(valores[0][i] * 100) / valores[1],
                    etinum: valores[0][i]
                });
                dibnumY.dibujarNumero();
            }
            break;
        case "X":
            for (let i = 0; i < numObj; i++) {
                const dibnumX = linNumX({
                    porcentaje: valores[0][i] * 100 / valores[1],
                    etinum: valores[0][i]
                });
                dibnumX.dibujarNumero();
            }
            break;
    }
}
//FIN PROCESO >> funcion imprimir datos de ejes