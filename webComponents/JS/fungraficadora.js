const btnAuto = document.getElementById("btn-auto"),
    btnPerf = document.getElementById("btn-per"),
    btnGen = document.getElementById("gen-graph"),
    cantX = document.getElementById("select-cant-x"),
    cantY = document.getElementById("select-cant-y"),
    cantC = document.getElementById("select-cant-coor"),
    cantOpSol = document.querySelector(".op-seg-solu"),
    mosRes = document.querySelector(".mos-res"),
    contDateGraph = document.querySelector(".cont-date-graph"),
    contInfoGraph = document.querySelector(".cont-info-graph"),
    contInfoGraphSolu = document.querySelector(".cont-info-graph-solu"),
    contMosRes = document.querySelector(".mos-cont-op-res"),
    contModoDatosG = document.querySelector(".cont-op-cant"),
    contModoDatosA = document.querySelector(".cont-op-grid-auto"),
    contModoDatosP = document.querySelector(".cont-op-per"),
    contGraph = document.querySelector(".cont-graph"),
    contButtonDis = document.querySelector(".cont-button-dis");
    descargar = document.querySelector(".cont-des-grap");
ini(); // Inicializacion de canvas
var slcAuto = true, conf = false// Variable para seleccion de modo/confirmacion para continuar con generar en personalizado
//INICIO PROCESO >> cuando el usuario selecciona personalizado
var cntC;
btnPerf.addEventListener("click", () => {
    contInfoGraphSolu.style.display = "none";
    mosRes.style.display = "none";
    cntC = cantC.value;
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "#000"
    ini();
    slcAuto = false;
    btnSelected(slcAuto);
    contInfoGraph.style.width = contDateGraph.clientWidth - 750 + "px"; // Se le asigna el tamano restante del div
    contInfoGraph.style.animation = "transparenciaActive 0.3s";
    contModoDatosA.style.display = "none";
    contModoDatosP.style.display = "flex";
    if(dispDetected()){
        contButtonDis.innerHTML="";
        const buttonGenCoor = document.createElement("button");
        buttonGenCoor.classList.add("btn-ingresar-datos","btn-resul");
        buttonGenCoor.id = "btn-ingreDatos";
        buttonGenCoor.innerHTML = "Generar Campos";
        contButtonDis.appendChild(buttonGenCoor);
        const clickButton = document.getElementById("btn-ingreDatos");
        clickButton.addEventListener("click", () => {
            contInfoGraph.style.display = "flex";
            agregarInputs();
        });
    }else{
        generarBtnIn();
        contInfoGraph.style.display = "flex";
        cantC.addEventListener("click", () => {
            if (cntC != cantC.value) {
                generarBtnIn();
            }
        });
        //generarBtnIn();// Generar campos para el registro de datos
    }
});
//FIN PROCESO >> cuando el usuario selecciona personalizado
//INICIO PROCESO >> cuando el usuario selecciona automatico
btnAuto.addEventListener("click", () => {
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = "#000"
    ini();
    contInfoGraphSolu.style.display = "none";
    slcAuto = true;
    btnSelected(slcAuto);
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
    let numY = parseInt(cantY.value); // Recoge la cantidad de datos que se van a graficar en Y
    let numX = parseInt(cantX.value); // Recoge la cantidad de datos que se van a graficar en X
    let numC = parseInt(cantC.value); // Recoge la cantidad de datos que se van a graficar en X
    let letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]; //Letras para puntos de segmento
    ini();
    console.log(numY + "---" + numX + "---" + numC);
    if (numY > numX) {
        alert("Asegurese de que los valores del eje Y no superen a los valores del eje X");
    } else {
        // console.log("se va de largo");
        if (slcAuto === true) {
            mosRes.innerHTML = "";
            const valoresY = llenarDatosAutomatico(numY); //Ingreso valores een recta > Eje Y
            const valoresX = llenarDatosAutomatico(numX);  //Ingreso valores een recta > Eje X
            const cy = coorCompletasY(numY, numX, valoresY); // Preparacion para graficar > arreglo para las coordenadas de Y
            dibujarDatos(numY, valoresY, "Y"); //Impresion de valores > Eje Y
            dibujarDatos(numX, valoresX, "X"); //Impresion de valores > Eje X
            imprimirSegmento(numX, cy, valoresX, valoresY); // Imprimir Segmento
            imprimirLetrasSegmento(numX, cy, valoresX, valoresY, letras); // Imprimir letra de cada punto del segmento
            imprimirGuiasDePuntos(numX, cy, valoresX, valoresY); //Imprimir lineas guias de cada punto el plano cartesiano
            mostrarSolucion(mosRes, numX, letras, valoresX[0], cy);
        } else {
            if (conf === true) {
                const valoresPY = validarCampos(numC, "datY"); //Se envia la cantidad de coordenadas y el inicio del id
                const valoresPX = validarCampos(numC, "datX"); //Se envia la cantidad de coordenadas y el inicio del id
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

descargar.addEventListener("click", () => {
    descargarCanvas(canvas)
});

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
        if (idC.value === "") {
            continuar = false;
            break;
        } else {
            coor[i] = parseFloat(idC.value);
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

    const divContX = document.createElement("div"); // Creacion de contenedor de datos  en Y
    divContX.classList.add("cont-info-per");
    const divContY = document.createElement("div"); // Creacion de contenedor de datos  en X
    divContY.classList.add("cont-info-per");
    const titContX = document.createElement("h3"); // Creacion de contenedor de datos  en Y
    titContX.innerHTML = "Tiempo (s)";
    const titContY = document.createElement("h3"); // Creacion de contenedor de datos  en X
    titContY.innerHTML = "Distancia (m)";
    const divInpX = document.createElement("div"); // Creacion de contenedor de datos  en Y
    divInpX.classList.add("cont-info-per-uni");
    const divInpY = document.createElement("div"); // Creacion de contenedor de datos  en X
    divInpY.classList.add("cont-info-per-uni");

    const fragY = document.createDocumentFragment();
    const fragX = document.createDocumentFragment();
    divContX.appendChild(titContX);
    divContX.appendChild(divInpX);
    divContY.appendChild(titContY);
    divContY.appendChild(divInpY);
    contInfoGraph.appendChild(divContX);
    contInfoGraph.appendChild(divContY);

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
//>> funcion inicio para mostrar la solucion
function mostrarSolucion(conRes, nPuntos, letra, cX, cY) {
    contInfoGraphSolu.style.display = "flex";
    contInfoGraphSolu.style.animation = "transparenciaActive 0.3s";
    const slec = document.createElement("select");
    slec.classList.add("op-num");
    slec.id = "select-sg-solu";
    const slectFrag = document.createDocumentFragment();
    cantOpSol.innerHTML = `<label class="lbl-op-solu">Segmento: </label>`;
    for (let i = 0; i < nPuntos; i++) {
        if (i === 0) {
            const optionIni = document.createElement("option");
            optionIni.value = -1;
            optionIni.innerHTML = `/ - /`;
            slectFrag.appendChild(optionIni);
        }
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = `${letra[i]} - ${letra[i + 1]}`;
        slectFrag.appendChild(option);
    }
    slec.appendChild(slectFrag);
    cantOpSol.appendChild(slec);
    const numSelec = document.getElementById("select-sg-solu");
    if (dispDetected()) {
        const buttonRes = document.createElement("button");
        buttonRes.classList.add("btn-ingresar-datos","btn-resul");
        buttonRes.id = "btn-verSolu";
        buttonRes.innerHTML = "Ver Solución";
        cantOpSol.appendChild(buttonRes);
        const clickButton = document.getElementById("btn-verSolu");
        clickButton.addEventListener("click", () => {
            try {
                mosRes.style.display = "flex";
                mosRes.innerHTML = "";
                mostrarRes(conRes, parseInt(numSelec.value), letra, cX, cY)
                numS = numSelec.value;
            } catch (error) {
                console.log("Sin seleccionar segmento");
            }
        });
    } else {
        let numS = -1;
        numSelec.addEventListener("click", () => {
            if (numS != numSelec.value && numSelec.value != -1) {
                try {
                    mosRes.style.display = "flex";
                    mosRes.innerHTML = "";
                    mostrarRes(conRes, parseInt(numSelec.value), letra, cX, cY)
                    numS = numSelec.value;
                } catch (error) {
                    console.log("Sin seleccionar segmento");
                }
            }
            numS = numSelec.value;
        });
    }
}
//>> Funcion para mostrar el resultado con sus datos y contenidos
function mostrarRes(cRes, nSeg, letra, cx, cy) {
    const divCont = document.createElement("div");
    const divEncaDat = document.createElement("div");
    const expFor = document.createElement("div");
    const expGraf = document.createElement("div");
    const expGrafRes = document.createElement("div");
    divEncaDat.classList.add("mos-res-part");
    expFor.classList.add("mos-res-part");
    expGraf.classList.add("mos-res-part");
    expGrafRes.classList.add("auto-gen-solu");
    const p1 = document.createElement("div");
    const p2 = document.createElement("div");
    let aux = 0, res;
    divCont.classList.add("auto-gen-solu");
    if (nSeg === 0) {
        cx[aux - 1] = 0;
        cy[aux - 1] = 0;
        p1.innerHTML = `<label>Punto ${letra[aux].toUpperCase()}:</label><p> t<sub>1</sub> = ${cx[aux - 1]} ; d<sub>1</sub> = ${cy[aux - 1]}</p>`;
        p2.innerHTML = `<label>Punto ${letra[aux + 1].toUpperCase()}:</label><p> t<sub>2</sub> = ${cx[aux]} ; d<sub>2</sub> = ${cy[aux]}</p> `;
    } else {
        aux = nSeg;
        p1.innerHTML = `<label>Punto ${letra[aux].toUpperCase()}:</label><p> t<sub>1</sub> = ${cx[aux - 1]} ; d<sub>1</sub> = ${cy[aux - 1]}</p> `;
        p2.innerHTML = `<label>Punto ${letra[aux + 1].toUpperCase()}:</label><p> t<sub>2</sub> = ${cx[aux]} ; d<sub>2</sub> = ${cy[aux]}</p>`;
    }
    if (nSeg === 0) {
        res = cy[aux] / cx[aux];
    } else {
        res = (cy[aux] - cy[aux - 1]) / (cx[aux] - cx[aux - 1])
    }
    expFor.innerHTML = `<h4>Tomar en cuenta que:</h4><math><mi>v</mi><mo>=</mo><mrow><mfrac><msup><mrow><mi>Δd</mi></mrow></msup><msup><mrow><mi>Δt</mi></mrow></msup></mfrac></mrow><mo>=</mo><mrow><mfrac><mrow><msup><mi>d2</mi></msup><mo>-</mo><msup><mi>d1</mi></msup></mrow><mrow><msup><mi>t2</mi></msup><mo>-</mo><msup><mi>t1</mi></msup></mrow></mfrac></mrow></math>`;
    expGraf.innerHTML = `<h4>Entonces:</h4><math><mi>v</mi><mo>=</mo><mrow><mfrac><msup><mrow><munder><mo>${cy[aux]}m</mo></munder><mo>-</mo><mi>${cy[aux - 1]}m</mi></mrow></msup><msup><mrow><mi>${cx[aux]}s</mi><mo>-</mo><mi>${cx[aux - 1]}s</mi></mrow></msup></mfrac></mrow></math>`
    expGrafRes.innerHTML = `<math><mi>v</mi><mo>=</mo><msup><mi>${redondear(res)}m/s</mi></msup></math>`;
    divCont.innerHTML = `<h4>Datos:</h4>`;
    divEncaDat.appendChild(p1);
    divEncaDat.appendChild(p2);
    divCont.appendChild(divEncaDat);
    cRes.appendChild(divCont);
    cRes.appendChild(expFor);
    cRes.appendChild(expGraf);
    cRes.appendChild(expGrafRes);
    console.log(nSeg);
}