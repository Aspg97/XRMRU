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
            num2 = nume2;
            res = num2 / num1;
            res = redondear(res);
            break;
        case "distancia":
            num1 = transformacionV(nume1, inumV.value, inumD.value, inumT.value);
            num2 = nume2;
            res = num1 * num2;
            res = redondear(res);

            break;
        case "velocidad":
            num1 = transformacionD(nume1, inumD.value, inumV.value);
            num2 = transformacionT(nume2, inumT.value, inumV.value);
            res = num1 / num2;
            res = redondear(res);
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
        case "km/m,km/m":
        case "km/s,km/s":
        case "m/h,m/h":
        case "m/m,m/m":
        case "m/s,m/s":
        case "cm/h,cm/h":
        case "cm/m,cm/m":
        case "cm/s,cm/s":
            numT = num;
            break;
        case "km/h,km/m":
        case "km/m,km/s":
        case "m/h,m/m":
        case "m/m,m/s":
        case "cm/h,cm/m":
        case "cm/m,cm/s":
            numT = num / 60;
            break;
        case "km/h,km/s":
        case "m/h,m/s":
        case "cm/h,cm/s":
            numT = num / 3600;
            break;
        case "km/m,km/h":
        case "km/s,km/m":
        case "m/m,m/h":
        case "m/s,m/m":
        case "cm/m,cm/h":
        case "cm/s,cm/m":
            numT = num / 0.0166667;
            break;
        case "km/s,km/h":
        case "m/s,m/h":
        case "cm/s,cm/h":
            numT = num / 0.00027777777778;
            break;
        //----------***********-------------
        case "km/h,m/h":
        case "km/m,m/m":
        case "km/s,m/s":
            numT = num * 1000;
            break;
        case "km/h,m/m":
        case "km/m,m/s":
            numT = (num * 1000) / 60;
            break;
        case "km/h,m/s":
            numT = (num * 1000) / 3600;
            break;
        case "km/m,m/h":
        case "km/s,m/m":
            numT = (num * 1000) / 0.0166667;
            break;
        case "km/s,m/h":
            numT = (num * 1000) / 0.00027777777778;
            break;
        //-----------*************--------------
        case "km/h,cm/h":
        case "km/m,cm/m":
        case "km/s,cm/s":
            numT = num * 100000;
            break;
        case "km/h,cm/m":
        case "km/m,cm/s":
            numT = (num * 100000) / 60;
            break;
        case "km/h,cm/s":
            numT = (num * 100000) / 3600;
            break;
        case "km/m,cm/h":
        case "km/s,cm/m":
            numT = (num * 100000) / 0.0166667;
            break;
        case "km/s,cm/h":
            numT = (num * 100000) / 0.00027777777778;
            break;
        //--------------******** TODO: m *******-------------
        case "m/h,km/h":
        case "m/m,km/m":
        case "m/s,km/s":
            numT = num * 0.001;
            break;
        case "m/h,km/m":
            numT = (num * 0.001) / 60;
            break;
        case "m/h,km/s":
        case "m/m,km/s":
            numT = (num * 0.001) / 3600;
            break;
        case "m/m,km/h":
        case "m/s,km/m":
            numT = (num * 0.001) / 0.0166667;
            break;
        case "m/s,km/h":
            numT = (num * 0.001) / 0.00027777777778;
            break;
        //-----------*************--------------
        case "m/h,cm/h":
        case "m/m,cm/m":
        case "m/s,cm/s":
            numT = num * 100;
            break;
        case "m/h,cm/m":
        case "m/m,cm/s":
            numT = (num * 100) / 60;
            break;
        case "m/h,cm/s":
            numT = (num * 100) / 3600;
            break;
        case "m/m,cm/h":
        case "m/s,cm/m":
            numT = (num * 100) / 0.0166667;
            break;
        case "m/s,cm/h":
            numT = (num * 100) / 0.00027777777778;
            break;
        //------------------******* TODO: cm********------------------
        case "cm/h,km/h":
        case "cm/m,km/m":
        case "cm/s,km/s":
            numT = num * 0.000010;
            break;
        case "cm/h,km/m":
        case "cm/m,km/s":
            numT = (num * 0.0000101) / 60;
            break;
        case "cm/h,km/s":
            numT = (num * 0.000010) / 3600;
            break;
        case "cm/m,km/h":
        case "cm/s,km/m":
            numT = (num * 0.000010) / 0.0166667;
            break;
        case "cm/s,km/h":
            numT = (num * 0.000010) / 0.00027777777778;
            break;
        //----------***********-------------
        case "cm/h,m/h":
        case "cm/m,m/m":
        case "cm/s,m/s":
            numT = num * 0.01;
            break;
        case "cm/h,m/m":
        case "cm/m,m/s":
            numT = (num * 0.01) / 60;
            break;
        case "cm/h,m/s":
            numT = (num * 0.01) / 3600;
            break;
        case "cm/m,m/h":
        case "cm/s,m/m":
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
        case "km,km/m":
        case "km,km/s":
        case "m,m/h":
        case "m,m/m":
        case "m,m/s":
            numT = num;
            break;
        case "m,km/h":
        case "m,km/m":
        case "m,km/s":
            numT = num * 0.001;
            break;
        case "cm,km/h":
        case "cm,km/m":
        case "cm,km/s":
            numT = num * 0.000010;
            break;
        case "km,m/h":
        case "km,m/m":
        case "km,m/s":
            numT = num * 1000;
            break;
        case "cm,m/h":
        case "cm,m/m":
        case "cm,m/s":
            numT = num * 0.01;
            break;
        case "km,cm/h":
        case "km,cm/m":
        case "km,cm/s":
            numT = num * 100000;
            break;
        case "m,cm/h":
        case "m,cm/m":
        case "m,cm/s":
            numT = num * 100;
            break;
        case "cm,cm/h":
        case "cm,cm/m":
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
        case "m,km/m":
        case "m,m/m":
        case "m,cm/m":
        case "s,km/s":
        case "s,m/s":
        case "s,cm/s":
            numT = num;
            break;
        case "h,km/m":
        case "h,m/m":
        case "h,cm/m":
        case "m,km/s":
        case "m,m/s":
        case "m,cm/s":
            numT = num * 60;
            break;
        case "h,km/s":
        case "h,m/s":
        case "h,cm/s":
            numT = num * 3600;
            break;
        case "m,km/h":
        case "m,m/h":
        case "m,cm/h":
        case "s,km/m":
        case "s,m/m":
        case "s,cm/m":
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
        if (resulS.lastIndexOf("0") == -1 || resulS.length > resulS.lastIndexOf(".") + 4) {

            resulF = res.toFixed(3);
            console.log("pss" + resulS.lastIndexOf(","));
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

// TEST >>> FUNCION PARA TOMAR EN CUENTA A LAS DIFERENTES UNIDADES DE VALOCIDADES

// function transformarVelocidad(vel, i) {
//     let idInputVelocidad = "umV" + i;
//     const uMVel = document.getElementById(idInputVelocidad);
//     let vTransformado
//     let unidad = uMVel.value;
//     switch (unidad) {
//         case "km/h":
//             vTransformado = vel * 100000 / 3600;
//             break;
//         case "km/m":
//             vTransformado = vel * 100000 / 60;
//             break;
//         case "km/s":
//             vTransformado = vel * 100000;
//             break;
//         case "m/h":
//             vTransformado = vel * 100 / 3600;
//             break;
//         case "m/m":
//             vTransformado = vel * 100 / 60;
//             break;
//         case "m/s":
//             vTransformado = vel * 100;
//             break;
//         case "cm/h":
//             vTransformado = vel / 3600;
//             break;
//         case "cm/m":
//             vTransformado = vel / 60;
//             break;
//         case "cm/s":
//             vTransformado = vel;
//             break;
//     }
//     return vTransformado;
// }