const btnAuto = document.getElementById("btn-auto");
const btnPerf = document.getElementById("btn-per");
const btnGen = document.getElementById("gen-graph");
const cantX = document.getElementById("select-cant-x");
const cantY = document.getElementById("select-cant-y");
const cantVal = document.querySelectorAll("select");
const contDateGraph = document.querySelector(".cont-date-graph");
const contInfoGraph = document.querySelector(".cont-info-graph");
const contGraph = document.querySelector(".cont-graph");

ini(); // Inicializacion de canvas
var slcAuto = true; // Variable para seleccion de modo
//INICIO PROCESO >> cuando el usuario selecciona personalizado
var cntY, cntX;
btnPerf.addEventListener("click", () => {
    slcAuto = true;
    btnSelected(slcAuto);
    contInfoGraph.style.display = "flex";
    contInfoGraph.style.width = contDateGraph.clientWidth - 750 + "px";
    contInfoGraph.style.animation = "transparenciaActive 0.3s";
    generarBtnIn();// Generar campos para el registro de datos
});
//FIN PROCESO >> cuando el usuario selecciona personalizado
//INICIO PROCESO >> cuando el usuario cambia de valores en las opciones de cantidad de valores
cantY.addEventListener("click", () => {
    if (cntY != cantY.value) {
        generarBtnIn();
    }
});
cantX.addEventListener("click", () => {
    if (cntX != cantX.value) {
        generarBtnIn();
    }
});
//FIN PROCESO >> cuando el usuario cambia de valores en las opciones de cantidad de valores
//INICIO PROCESO >> cuando el usuario selecciona automatico
btnAuto.addEventListener("click", () => {
    slcAuto = false;
    btnSelected(slcAuto);
    contInfoGraph.innerHTML = "Esfuérzate un poquito mas PAPU";
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
btnGen.addEventListener("click", () => {
    let numY = cantY.value; // Recoge la cantidad de datos que se van a graficar en Y
    let numX = cantX.value; // Recoge la cantidad de datos que se van a graficar en X
    pincel.fillStyle = "#000";
    pincel.strokeStyle = "#000";
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    ini();
    if (numY > numX) {
        alert("Asegurese de que los valores del eje Y no superen a los valores del eje X");
    } else {
        //Ingreso valores een recta
        const valoresY = llenarDatos(numY); //Ingreso valores een recta > Eje Y
        const valoresX = llenarDatos(numX);  //Ingreso valores een recta > Eje X
        //impresion de valores
        dibujarDatos(numY, valoresY, "Y"); //Impresion de valores > Eje Y
        dibujarDatos(numX, valoresX, "X"); //Impresion de valores > Eje X
        //Preparacion para graficar
        let letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]; //Preparacion para graficar > letras para nodos de segmento
        let cy = []; // Preparacion para graficar > arreglo para las coordenadas de Y
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
            } else {
                const dibSegmento = segmento({
                    px1: valoresX[0][i - 1] * 100 / valoresX[1],
                    py1: -cy[i - 1] * 100 / valoresY[1],
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
        //Imprimir lineas guia Y
        for (let i = 0; i < numX; i++) {
            const impGuiasY = guias({
                lcx: valoresX[0][i] * 100 / valoresX[1],
                ancy1: -cy[i] * 100 / valoresY[1],
                guia: "y",
            });
            const impGuiasX = guias({
                ancy1: -cy[i] * 100 / valoresY[1],
                ancx1: valoresX[0][i] * 100 / valoresX[1],
                guia: "x",
            });
            impGuiasY.dibujarGuias();
            impGuiasX.dibujarGuias();
        }
        //const impGuias = guias({});
        //impGuias.dibujarGuias()
    }
});
//FIN PROCESO >> accion del boton generar
//INICIO PROCESO >> funcion llenar datos de ejes
function llenarDatos(numObj) {
    let array = [numObj], numM = 0;
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
//INICIO PROCESO >> anadir inputs de tomar datos al html
function agregarInputs() {
    contInfoGraph.innerHTML = "";
    contInfoGraph.style.alignItems = "flex-start"
    let numY = cantY.value; // Recoge la cantidad de datos que se van a graficar en Y
    let numX = cantX.value; // Recoge la cantidad de datos que se van a graficar en X
    cntY = cantY.value; // Recoge la cantidad de datos que se van a graficar en Y
    cntX = cantX.value; // Recoge la cantidad de datos que se van a graficar en X
    if (numY > numX) {
        alert("Asegurese de que los valores del eje Y no superen a los valores del eje X");
    } else {
        const divContY = document.createElement("div"); // Creacion de contenedor de datos  en Y
        divContY.classList.add("cont-info-per");
        const divContX = document.createElement("div"); // Creacion de contenedor de datos  en X
        divContX.classList.add("cont-info-per");
        const titContY = document.createElement("h3"); // Creacion de contenedor de datos  en Y
        titContY.innerHTML = "Valores: distancia";
        const titContX = document.createElement("h3"); // Creacion de contenedor de datos  en X
        titContX.innerHTML = "Valores: tiempo";
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
        for (let i = 0; i < numX; i++) {
            if (i < numY) {
                const contItemY = document.createElement("div");
                contItemY.innerHTML = "<label class='eti-dat'>Valor " + (i + 1) + ":</label><input type='number' class='inpDato' id='datY" + i + "'>";
                fragY.appendChild(contItemY);
            }
            const contItemX = document.createElement("div");
            contItemX.innerHTML = "<label class='eti-dat'>Valor " + (i + 1) + ":</label><input type='number' class='inpDato' id='datX" + i + "'>";
            fragX.appendChild(contItemX);
        }
        divInpY.appendChild(fragY);
        divInpX.appendChild(fragX);
    }
}
//FIN PROCESO >> anadir inputs de tomar datos al html
//INICIO PROCESO >> funcion para generar boton
function generarBtnIn (){
    contInfoGraph.style.alignItems = "center";
    contInfoGraph.innerHTML = "<button class='btn-ingresar-datos' id='btn-ing-dat'>Ingresar datos</button>";
    const btnIng = document.getElementById("btn-ing-dat");
    btnIng.addEventListener("click", () => agregarInputs());// Mostrar campos para el registro de datos
}
//FIN PROCESO >> funcion para generar boton