const btnAuto = document.getElementById("btn-auto");
const btnPerf = document.getElementById("btn-per");
const btnGen = document.getElementById("gen-graph");
const cantX = document.getElementById("select-cant-x");
const cantY = document.getElementById("select-cant-y");
const cantC = document.getElementById("select-cant-coor");
const contDateGraph = document.querySelector(".cont-date-graph");
const contInfoGraph = document.querySelector(".cont-info-graph");
const contModoDatosG = document.querySelector(".cont-op-cant");
const contModoDatosA = document.querySelector(".cont-op-grid-auto");
const contModoDatosP = document.querySelector(".cont-op-per");
const contGraph = document.querySelector(".cont-graph");
ini(); // Inicializacion de canvas
var slcAuto = true, conf = false// Variable para seleccion de modo/confirmacion para continuar con generar en personalizado
//INICIO PROCESO >> cuando el usuario selecciona personalizado
var cntC;
btnPerf.addEventListener("click", () => {
    cntC = cantC.value;
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "#000"
    ini();
    slcAuto = false;
    btnSelected(slcAuto);
    contInfoGraph.style.display = "flex";
    contInfoGraph.style.width = contDateGraph.clientWidth - 750 + "px"; // Se le asigna el tamano restante del div
    contInfoGraph.style.animation = "transparenciaActive 0.3s";
    contModoDatosA.style.display = "none";
    contModoDatosP.style.display = "flex";
    generarBtnIn();// Generar campos para el registro de datos
});
//FIN PROCESO >> cuando el usuario selecciona personalizado
//INICIO PROCESO >> cuando el usuario cambia de valores en las opciones de cantidad de valores
cantC.addEventListener("click", () => {
    if (cntC != cantC.value) {
        generarBtnIn();
    }
});
//FIN PROCESO >> cuando el usuario cambia de valores en las opciones de cantidad de valores
//INICIO PROCESO >> cuando el usuario selecciona automatico
btnAuto.addEventListener("click", () => {
    slcAuto = true;
    btnSelected(slcAuto);
    contInfoGraph.innerHTML = "Esfuérzate un poquito mas papu";
    contGraph.style.left = ((contDateGraph.clientWidth / 2) - 365) + "px";
    contInfoGraph.removeAttribute("style");
    contModoDatosA.style.display = "grid";
    contModoDatosP.style.display = "none";
});
//FIN PROCESO >> cuando el usuario selecciona automatico
//INICIO PROCESO >> accion del boton generar
btnGen.addEventListener("click", () => {
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "#000";
    pincel.strokeStyle = "#000";
    let numY = cantY.value; // Recoge la cantidad de datos que se van a graficar en Y
    let numX = cantX.value; // Recoge la cantidad de datos que se van a graficar en X
    let numC = cantC.value; // Recoge la cantidad de datos que se van a graficar en X
    let letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]; //Letras para puntos de segmento
    ini();
    console.log(numY + "---" + numX + "---" + numC);
    if (numY > numX) {
        alert("Asegurese de que los valores del eje Y no superen a los valores del eje X");
    } else {
        console.log("se va de largo");
        if (slcAuto === true) {
            const valoresY = llenarDatosAutomatico(numY); //Ingreso valores een recta > Eje Y
            const valoresX = llenarDatosAutomatico(numX);  //Ingreso valores een recta > Eje X
            const cy = coorCompletasY(numY, numX, valoresY); // Preparacion para graficar > arreglo para las coordenadas de Y
            dibujarDatos(numY, valoresY, "Y"); //Impresion de valores > Eje Y
            dibujarDatos(numX, valoresX, "X"); //Impresion de valores > Eje X
            imprimirSegmento(numX, cy, valoresX, valoresY); // Imprimir Segmento
            imprimirLetrasSegmento(numX, cy, valoresX, valoresY, letras); // Imprimir letra de cada punto del segmento
            imprimirGuiasDePuntos(numX, cy, valoresX, valoresY); //Imprimir lineas guias de cada punto el plano cartesiano
        } else {
            if (conf === true) {
                const valoresPY = validarCampos(numC, "datY");
                const valoresPX = validarCampos(numC, "datX");
                if (valoresPX[2] === false || valoresPY[2] === false) {
                    alert("Llene todos los campos de valores");
                } else {
                    dibujarDatos(numC, valoresPY, "Y"); //Impresion de valores > Eje Y
                    dibujarDatos(numC, valoresPX, "X"); //Impresion de valores > Eje X
                    imprimirSegmento(numC, valoresPY[0], valoresPX, valoresPY); // Imprimir Segmento
                    imprimirLetrasSegmento(numC, valoresPY[0], valoresPX, valoresPY, letras); // Imprimir letra de cada punto del segmento
                    imprimirGuiasDePuntos(numC, valoresPY[0], valoresPX, valoresPY); //Imprimir lineas guias de cada punto el plano cartesiano
                }
            } else {
                alert("Ingrese los campos y llénelos");
            }
        }
    }
});
//FIN PROCESO >> accion del boton generar

//>> funcion estilo seleccion tipo de generar
function btnSelected(auto) {
    if (auto == false) {
        btnAuto.style.borderBottom = "none";
        btnPerf.style.borderBottom = "solid 5px #034492";
    } else {
        btnPerf.removeAttribute("style");
        btnAuto.setAttribute("style", "border-bottom: solid 5px var(--first-color);");
    }
}
//>> funcion llenar datos de ejes
function llenarDatosAutomatico(numObj) {
    let array = [], numM = 0;
    for (let i = 0; i < numObj; i++) {
        array[i] = Math.round(Math.random() * 100);
        for (let j = i - 1; j >= 0; j--) { // bucle para comparar los numero ingresado con los anteriores
            if (Math.abs(array[i] - array[j]) < 5) { // validacion por si los numeros estan menos de 5 unidaddes cerca
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
//>> funcion recoger datos de inputs personalizado
const validarCampos = (nC, tipCoor) => {
    let continuar = true;
    let coor = [];
    let max = 0;
    for (let i = 0; i < nC; i++) {
        let idInpC = tipCoor + String(i);
        const idC = document.getElementById(idInpC);
        console.log(i);
        if (idC.value === "") {
            continuar = false;
            break;
        } else {
            coor[i] = idC.value;
        }
        if (max < coor[i]) {
            max = coor[i];
        }
    }
    console.log(max);
    return [coor, max, continuar];
}
//>> funcion completar coordenadas del eje Y con las del eje X
const coorCompletasY = (nY, nX, valY) => {
    let coorY = [];
    //Se llenan espacios aleatorios entre 0 y 7 con los elementos del vector de Y
    for (let i = 0; i < nY; i++) {
        let rn = Math.floor(Math.random() * ((nX - 1) - 0 + 1)) + 0;
        if (coorY[rn] == null) {
            coorY[rn] = valY[0][i];
        } else {
            i--;
        }
    }
    //Se llenan los espacios vacios del vector de coordenadas de Y "cy"
    for (let i = 0; i < nX; i++) {
        if (coorY[0] == null) {
            coorY[0] = valY[0][Math.floor(Math.random() * ((nY - 1) - 0 + 1)) + 0]
        } else if (coorY[i] == null) {
            coorY[i] = coorY[i - 1];
        }
    }
    return coorY;
}
//>> funcion imprimir datos de ejes
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
//>> funcion para imprimir cada segmento
function imprimirSegmento(nX, corY, valX, valY) {
    for (let i = 0; i < nX; i++) {
        if (i == 0) {
            const dibSegmento = segmento({
                px1: 0,
                py1: 0,
                px2: valX[0][i] * 100 / valX[1],
                py2: -corY[i] * 100 / valY[1]
            });
            dibSegmento.dibujarSegmento();
        } else {
            const dibSegmento = segmento({
                px1: valX[0][i - 1] * 100 / valX[1],
                py1: -corY[i - 1] * 100 / valY[1],
                px2: valX[0][i] * 100 / valX[1],
                py2: -corY[i] * 100 / valY[1]
            });
            dibSegmento.dibujarSegmento();
        }
    }
}
//>> imprimir las letras de cada punto de los segmentos
function imprimirLetrasSegmento(nX, corY, valX, valY, letras) {
    for (let i = 0; i < nX + 1; i++) {
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
                px: valX[0][i - 1] * 100 / valX[1],
                py: -corY[i - 1] * 100 / valY[1]
            });
            letra.dibujarLetra();
            letra.dibujarPunto();
        }
    }
}
//>> imprimir lineas guia de cada punto de cordenadas
function imprimirGuiasDePuntos(nX, corY, valX, valY) {
    for (let i = 0; i < nX; i++) {
        const impGuiasY = guias({
            lcx: valX[0][i] * 100 / valX[1],
            ancy1: -corY[i] * 100 / valY[1],
            guia: "y",
        });
        const impGuiasX = guias({
            ancy1: -corY[i] * 100 / valY[1],
            ancx1: valX[0][i] * 100 / valX[1],
            guia: "x",
        });
        impGuiasY.dibujarGuias();
        impGuiasX.dibujarGuias();
    }
}
//>> funcion para generar boton
function generarBtnIn() {
    cntC = cantC.value;
    contInfoGraph.style.alignItems = "center";
    contInfoGraph.innerHTML = "<button class='btn-ingresar-datos' id='btn-ing-dat'>Ingresar datos</button>";
    const btnIng = document.getElementById("btn-ing-dat");
    btnIng.addEventListener("click", () => agregarInputs());// Mostrar campos para el registro de datos
}
//>> anadir inputs al presionar ingresar datos en modo personalizado
function agregarInputs() {
    conf = true;
    contInfoGraph.innerHTML = "";
    contInfoGraph.style.alignItems = "flex-start"
    let numCoor = cantC.value; // Recoge la cantidad de datos que se van a graficar en X

    const divContY = document.createElement("div"); // Creacion de contenedor de datos  en Y
    divContY.classList.add("cont-info-per");
    const divContX = document.createElement("div"); // Creacion de contenedor de datos  en X
    divContX.classList.add("cont-info-per");
    const titContY = document.createElement("h3"); // Creacion de contenedor de datos  en Y
    titContY.innerHTML = "Distancia";
    const titContX = document.createElement("h3"); // Creacion de contenedor de datos  en X
    titContX.innerHTML = "Tiempo";
    const divInpY = document.createElement("div"); // Creacion de contenedor de datos  en Y
    divInpY.classList.add("cont-info-per-uni");
    const divInpX = document.createElement("div"); // Creacion de contenedor de datos  en X
    divInpX.classList.add("cont-info-per-uni");
    const fragY = document.createDocumentFragment();
    const fragX = document.createDocumentFragment();
    divContY.appendChild(titContY);
    divContY.appendChild(divInpY);
    divContX.appendChild(titContX);
    divContX.appendChild(divInpX);
    contInfoGraph.appendChild(divContY);
    contInfoGraph.appendChild(divContX);

    for (let i = 0; i < numCoor; i++) {
        const contItemY = document.createElement("div");
        contItemY.innerHTML = "<label class='eti-dat'>Valor " + (i + 1) + ":</label><input type='number' class='inpDato' id='datY" + i + "'>";
        fragY.appendChild(contItemY);

        const contItemX = document.createElement("div");
        contItemX.innerHTML = "<label class='eti-dat'>Valor " + (i + 1) + ":</label><input type='number' class='inpDato' id='datX" + i + "'>";
        fragX.appendChild(contItemX);
    }
    divInpY.appendChild(fragY);
    divInpX.appendChild(fragX);

}