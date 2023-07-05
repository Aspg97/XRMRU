function definirOP(nume1, nume2, op, numObj) {
    let idumV = "umV" + numObj;
    let idumD = "umD" + numObj;
    let idumT = "umT" + numObj;
    let num1, num2;
    const inumV = document.getElementById(idumV);
    const inumD = document.getElementById(idumD);
    const inumT = document.getElementById(idumT);
    switch (op) {
        case "tiempo":
            num1 = transformacionV(nume1, inumV.value, inumD.value, inumT.value);
            if (validaciones(num1, nume2, op) == true) {
                res = nume2 / num1;
                res = redondear(res);
            }
            break;
        case "distancia":
            num1 = transformacionV(nume1, inumV.value, inumD.value, inumT.value);
            if (validaciones(num1, nume2, op) == true) {
                res = num1 * nume2;
                res = redondear(res);
            }
            break;
        case "velocidad":
            num1 = transformacionD(nume1, inumD.value, inumV.value);
            num2 = transformacionT(nume2, inumT.value, inumV.value);
            if (validaciones(num1, num2, op) == true) {
                res = num1 / num2;
                res = redondear(res);
            }
            break;
    }
    return res;
}

function transformacionV(num, unI, unFd, unFt) {
    let numT;
    let op = unI + "," + unFd + "/" + unFt
    switch (op) {
        //--------------******** TODO: km *******-------------
        case "km/h,km/h":
        case "km/min,km/min":
        case "km/s,km/s":
        case "m/h,m/h":
        case "m/min,m/min":
        case "m/s,m/s":
        case "cm/h,cm/h":
        case "cm/min,cm/min":
        case "cm/s,cm/s":
            numT = num;
            break;
        case "km/h,km/min":
        case "km/min,km/s":
        case "m/h,m/min":
        case "m/min,m/s":
        case "cm/h,cm/min":
        case "cm/min,cm/s":
            numT = num / 60;
            break;
        case "km/h,km/s":
        case "m/h,m/s":
        case "cm/h,cm/s":
            numT = num / 3600;
            break;
        case "km/min,km/h":
        case "km/s,km/min":
        case "m/min,m/h":
        case "m/s,m/min":
        case "cm/min,cm/h":
        case "cm/s,cm/min":
            numT = num / 0.0166667;
            break;
        case "km/s,km/h":
        case "m/s,m/h":
        case "cm/s,cm/h":
            numT = num / 0.00027777777778;
            break;
        //----------***********-------------
        case "km/h,m/h":
        case "km/min,m/min":
        case "km/s,m/s":
            numT = num * 1000;
            break;
        case "km/h,m/min":
        case "km/min,m/s":
            numT = (num * 1000) / 60;
            break;
        case "km/h,m/s":
            numT = (num * 1000) / 3600;
            break;
        case "km/min,m/h":
        case "km/s,m/min":
            numT = (num * 1000) / 0.0166667;
            break;
        case "km/s,m/h":
            numT = (num * 1000) / 0.00027777777778;
            break;
        //-----------*************--------------
        case "km/h,cm/h":
        case "km/min,cm/min":
        case "km/s,cm/s":
            numT = num * 100000;
            break;
        case "km/h,cm/min":
        case "km/min,cm/s":
            numT = (num * 100000) / 60;
            break;
        case "km/h,cm/s":
            numT = (num * 100000) / 3600;
            break;
        case "km/min,cm/h":
        case "km/s,cm/min":
            numT = (num * 100000) / 0.0166667;
            break;
        case "km/s,cm/h":
            numT = (num * 100000) / 0.00027777777778;
            break;
        //--------------******** TODO: m *******-------------
        case "m/h,km/h":
        case "m/min,km/min":
        case "m/s,km/s":
            numT = num * 0.001;
            break;
        case "m/h,km/min":
            numT = (num * 0.001) / 60;
            break;
        case "m/h,km/s":
        case "m/min,km/s":
            numT = (num * 0.001) / 3600;
            break;
        case "m/min,km/h":
        case "m/s,km/min":
            numT = (num * 0.001) / 0.0166667;
            break;
        case "m/s,km/h":
            numT = (num * 0.001) / 0.00027777777778;
            break;
        //-----------*************--------------
        case "m/h,cm/h":
        case "m/min,cm/min":
        case "m/s,cm/s":
            numT = num * 100;
            break;
        case "m/h,cm/min":
        case "m/min,cm/s":
            numT = (num * 100) / 60;
            break;
        case "m/h,cm/s":
            numT = (num * 100) / 3600;
            break;
        case "m/min,cm/h":
        case "m/s,cm/min":
            numT = (num * 100) / 0.0166667;
            break;
        case "m/s,cm/h":
            numT = (num * 100) / 0.00027777777778;
            break;
        //------------------******* TODO: cm********------------------
        case "cm/h,km/h":
        case "cm/min,km/min":
        case "cm/s,km/s":
            numT = num * 0.000010;
            break;
        case "cm/h,km/min":
        case "cm/min,km/s":
            numT = (num * 0.0000101) / 60;
            break;
        case "cm/h,km/s":
            numT = (num * 0.000010) / 3600;
            break;
        case "cm/min,km/h":
        case "cm/s,km/min":
            numT = (num * 0.000010) / 0.0166667;
            break;
        case "cm/s,km/h":
            numT = (num * 0.000010) / 0.00027777777778;
            break;
        //----------***********-------------
        case "cm/h,m/h":
        case "cm/min,m/min":
        case "cm/s,m/s":
            numT = num * 0.01;
            break;
        case "cm/h,m/min":
        case "cm/min,m/s":
            numT = (num * 0.01) / 60;
            break;
        case "cm/h,m/s":
            numT = (num * 0.01) / 3600;
            break;
        case "cm/min,m/h":
        case "cm/s,m/min":
            numT = (num * 0.01) / 0.0166667;
            break;
        case "cm/s,m/h":
            numT = (num * 0.01) / 0.00027777777778;
            break;
    }
    return numT
}

function transformacionD(num, unI, unF) {
    let numT;
    let op = unI + "," + unF
    switch (op) {
        case "km,km/h":
        case "km,km/min":
        case "km,km/s":
        case "m,m/h":
        case "m,m/min":
        case "m,m/s":
            numT = num;
            break;
        case "m,km/h":
        case "m,km/min":
        case "m,km/s":
            numT = num * 0.001;
            break;
        case "cm,km/h":
        case "cm,km/min":
        case "cm,km/s":
            numT = num * 0.000010;
            break;
        case "km,m/h":
        case "km,m/min":
        case "km,m/s":
            numT = num * 1000;
            break;
        case "cm,m/h":
        case "cm,m/min":
        case "cm,m/s":
            numT = num * 0.01;
            break;
        case "km,cm/h":
        case "km,cm/min":
        case "km,cm/s":
            numT = num * 100000;
            break;
        case "m,cm/h":
        case "m,cm/min":
        case "m,cm/s":
            numT = num * 100;
            break;
        case "cm,cm/h":
        case "cm,cm/min":
        case "cm,cm/s":
            numT = num;
            break;
    }
    return numT
}

function transformacionT(num, unI, unF) {
    let numT;
    let op = unI + "," + unF
    switch (op) {
        case "h,km/h":
        case "h,m/h":
        case "h,cm/h":
        case "min,km/min":
        case "min,m/min":
        case "min,cm/min":
        case "s,km/s":
        case "s,m/s":
        case "s,cm/s":
            numT = num;
            break;
        case "h,km/min":
        case "h,m/min":
        case "h,cm/min":
        case "min,km/s":
        case "min,m/s":
        case "min,cm/s":
            numT = num * 60;
            break;
        case "h,km/s":
        case "h,m/s":
        case "h,cm/s":
            numT = num * 3600;
            break;
        case "min,km/h":
        case "min,m/h":
        case "min,cm/h":
        case "s,km/min":
        case "s,m/min":
        case "s,cm/min":
            numT = num * 0.0166667;
            break;
        case "s,km/h":
        case "s,m/h":
        case "s,cm/h":
            numT = num * 0.00027777777778;
            break;
    }
    return numT
}

function redondear(res) {
    let resulF;
    let resulS = res.toString();

    if (resulS.lastIndexOf(".") > 0) {
        if (resulS.length > resulS.lastIndexOf(".") + 4) {
            resulF = res.toFixed(3);
            //console.log("pss" + resulS.lastIndexOf(","));
            if (resulF == 0.000) {
                alert("Resultado fuera de rango");
            }
        } else if (resulS.lastIndexOf("0") > 8) {
            console.log(resulS);
            resulF = res.toFixed(8);
        } else { resulF = res; }
    } else {
        resulF = res;
        console.log("pss" + resulS.lastIndexOf(","));
    }
    return resulF;
}
// INICIO >>> Recoleccion de id de informacion inputs
function idInputs(i) {
    let idV = "inpV" + i,
        idD = "inpD" + i,
        idT = "inpT" + i;
    const inpV = document.getElementById(idV),
        inpD = document.getElementById(idD),
        inpT = document.getElementById(idT);
    let idIn = [inpV, inpD, inpT];
    return idIn;
}

//INICIO >>> Recoleccion de id de informacion de unidades de medida
function idSelec(i) {
    let idSV = "umV" + i,
        idSD = "umD" + i,
        idST = "umT" + i;
    const idSlcV = document.getElementById(idSV),
        idSlcD = document.getElementById(idSD),
        idSlcT = document.getElementById(idST);
    let idSelec = [idSlcV, idSlcD, idSlcT];
    return idSelec;
}

//INICIO >>> distancias para desplazamiento
function distancias(maxDisIn, disTotal) {
    let distanciasInput = [];
    for (let i = 0; i < numObj.value; i++) {
        let idInpDis = "inpD" + i;
        const inDistancia = document.getElementById(idInpDis);
        distanciasInput.push(parseFloat(inDistancia.value) * disTotal / maxDisIn);
    }
    return distanciasInput;
}

//INICIO >>> velocidades para desplazamiento
function velocidades(maxVelIn) {
    let velocidadesInput = [];
    for (let i = 0; i < numObj.value; i++) {
        let idInpVel = "inpV" + i;
        const inVelocidad = document.getElementById(idInpVel);
        velocidadesInput.push(parseFloat(inVelocidad.value) * 3 / maxVelIn);
    }
    return velocidadesInput;
}

// INICIO >>> Funcion para activar el boton de play
function activarBtnPlay(afi) {
    if (afi == true) {
        idTitulo.textContent = "Simulación 2D: estamos listos!";
        backTitulo.style.backgroundImage = 'url("../IMG/Simulator/fondo-estado-verde.png")';
        document.querySelector(".btn-play").disabled = false;
        btn_play.style.background = "#034492"
        btn_play.style.color = "#fff"
    } else {
        document.querySelector(".btn-play").disabled = true;
        btn_play.style.background = "linear-gradient(135deg, #034492, #0070C2, #034492, #0070C2, #034492, #0070C2, #034492, #0070C2, #034492)";
    }
}

// INICIO >>> Validaciones para numeros negativos y divisiones por cero
function validaciones(num1, num2, op) {
    let confValidacion = true;
    if (num1 < 0 || num2 < 0) {
        alert("Ingresa valores positivos");
        confValidacion = false;
    }
    switch (op) {
        case "tiempo":
            if (num1 == 0) {
                alert("No se pueden realizar divisiones por 0");
                confValidacion = false;
            }
            break;
        case "velocidad":
            if (num2 == 0) {
                alert("No se pueden realizar divisiones por 0");
                confValidacion = false;
            }
            break;
        default:
            console.log("DESDE VALIDACIONES >>> Seguramente tiene que ver con la distancia");
    }
    return confValidacion;
}

//INICIO >>> Creacion de funciones para la seleccion de incognitas
const incogSelected = (idForMover, numIdBotones) => {
    let idMove = idForMover.substring(0, idForMover.lastIndexOf("-"));
    let numId = numIdBotones.substring(numIdBotones.lastIndexOf("c") + 1, numIdBotones.length);
    //console.log(idMove + " --- "+ numId);
    valores(idMove, numIdBotones, numId);
}

const valores = (idMove, numId, numIdInp) => {
    let idV = "checked-v-" + numId,
        idD = "checked-d-" + numId,
        idT = "checked-t-" + numId,
        idCV = "icg-v-" + numId,
        idCD = "icg-d-" + numId,
        idCT = "icg-t-" + numId,
        idInpV = "inpV" + numIdInp,
        idInpD = "inpD" + numIdInp,
        idInpT = "inpT" + numIdInp;
    const idMV = document.getElementById(idV),
        idMD = document.getElementById(idD),
        idMT = document.getElementById(idT),
        idBV = document.getElementById(idCV),
        idBD = document.getElementById(idCD),
        idBT = document.getElementById(idCT),
        idIV = document.getElementById(idInpV),
        idID = document.getElementById(idInpD),
        idIT = document.getElementById(idInpT);
    switch (idMove) {
        case "checked-v":
            habilitarCheck(idBV, idMV, idIV);
            desabilitarCheck(idBD, idMD, idID);
            desabilitarCheck(idBT, idMT, idIT);
            break;
        case "checked-d":
            desabilitarCheck(idBV, idMV, idIV);
            habilitarCheck(idBD, idMD, idID);
            desabilitarCheck(idBT, idMT, idIT);
            break;
        case "checked-t":
            desabilitarCheck(idBV, idMV, idIV);
            desabilitarCheck(idBD, idMD, idID);
            habilitarCheck(idBT, idMT, idIT);
            break;
    }
}

const habilitarCheck = (idO, id, idInp) => {
    id.style.left = "auto";
    id.style.right = "2px";
    idO.style.backgroundColor = "#FF7979";
    idInp.setAttribute("disabled", "true");
    idInp.style.backgroundColor = "#ddd";
    idInp.style.fontWeight = "bold";
    idInp.value = "";
}

const desabilitarCheck = (idO, id, idInp) => {
    id.removeAttribute('style');
    idO.style.backgroundColor = "#51BB63";
    idInp.removeAttribute("disabled");
    idInp.style.backgroundColor = "#fff";
    idInp.style.fontWeight = "normal";
}

// INICIO >>> funcion para dibujar la longitud de la linea de cota
function dibLong(dis, i) {
    let idLong = "disRel" + i;
    const idCota = document.getElementById(idLong);
    idCota.style.width = dis + "px";
}

// INICIO >>> funcion para expresar los datos en simulacion
function represtarDatosSimu(idV, idUM, i) {
    let idDatV = "vel-auto-" + i,
        idDatD = "dis-auto-" + i,
        idDatT = "time-auto-" + i,
        idUDatV = "uni-vel-auto-" + i,
        idUDatD = "uni-dis-auto-" + i,
        idUDatT = "uni-time-auto-" + i;
    const lblVel = document.getElementById(idDatV),
        lblDis = document.getElementById(idDatD),
        lblTime = document.getElementById(idDatT),
        lblUniVel = document.getElementById(idUDatV),
        lblUniDis = document.getElementById(idUDatD),
        lblUniTime = document.getElementById(idUDatT);
    lblVel.innerHTML = "";
    lblDis.innerHTML = "";
    lblTime.innerHTML = "";
    lblUniVel.innerHTML = "";
    lblUniDis.innerHTML = "";
    lblUniTime.innerHTML = "";
    //ingreso de datos velocidad
    lblVel.innerHTML = idV[0].value;
    lblUniVel.innerHTML = idUM[0].value;
    //ingreso de datos distancia
    lblDis.innerHTML = idV[1].value;
    lblUniDis.innerHTML = idUM[1].value;
    //ingreso de datos tiempo
    lblTime.innerHTML = idV[2].value;
    lblUniTime.innerHTML = idUM[2].value;
}