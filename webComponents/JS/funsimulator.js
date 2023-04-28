let numObj = document.getElementById("num-obj");
let crearObj = document.querySelector(".obj");
let generar = document.getElementById("btn-gen");
let calcular = document.getElementById("btn-simu");
let cont = false;
generar.addEventListener("click", () => {
    crearObj.innerHTML = ""
    console.log("Se genero " + numObj.value + " elementos");
    const objUni = document.createDocumentFragment();
    for (let i = 0; i < numObj.value; i++) {
        const contInfoObj = document.createElement("DIV");
        contInfoObj.innerHTML =
            `<div class="mos-obj" id="mos-obj-uni">
                <label>Auto #`+ (i + 1) + `</label>
                <div class="cont-inp" id="cont-inp-info">
                    <input type="number" class="inpO" value="" id="inpV`+ i + `">
                    <select class="opt-um" id="umV`+ i + `">
                        <option>km/h</option>
                        <option>m/h</option>
                        <option>cm/h</option>
                        <option>km/m</option>
                        <option>m/m</option>
                        <option>cm/m</option>
                        <option>m/s</option>
                        <option>km/s</option>
                        <option>cm/s</option>
                    </select>
                    <input type="number" class="inpO" value="" id="inpD`+ i + `">
                    <select class="opt-um" id="umD`+ i + `">
                        <option>km</option>
                        <option>m</option>
                        <option>cm</option>
                    </select>
                    <input type="number" class="inpO" value="" id="inpT`+ i + `">
                    <select class="opt-um" id="umT`+ i + `">
                        <option>h</option>
                        <option>s</option>
                        <option>m</option>
                    </select>
                </div>
            </div>`;
        objUni.appendChild(contInfoObj);
    }
    crearObj.appendChild(objUni);
});
//let conInp = document.getElementById("cont-inp-info");
let op;
calcular.addEventListener("click", () => {
    console.log("Calculando");
    for (let i = 0; i < numObj.value; i++) {
        let idV = "inpV" + i;
        let idD = "inpD" + i;
        let idT = "inpT" + i;
        const inpV = document.getElementById(idV);
        const inpD = document.getElementById(idD);
        const inpT = document.getElementById(idT);
        if ((inpV.value == "" & inpD.value == "") || (inpV.value == "" & inpT.value == "") || (inpD.value == "" & inpT.value == "")) {
            alert("Llene almenos 2 datos de cada objeto");
        } else if (inpV.value != "" & inpD.value != "") {
            op = "tiempo";
            inpT.value = definirOP(inpV.value, inpD.value, op, i);

        } else if (inpV.value != "" & inpT.value != "") {
            op = "distancia";
            inpD.value = definirOP(inpV.value, inpT.value, op, i);

        } else if (inpD.value != "" & inpT.value != "") {
            op = "velocidad";
            inpV.value = definirOP(inpD.value, inpT.value, op, i);

        }
    }
});

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
            console.log(res);
            break;
        case "distancia":
            num1 = transformacionV(nume1, inumV.value, inumD.value, inumT.value);

            let num1S = num1.toString();
            if(num1S.length>num1S.lastIndexOf("0")+4){
                if(num1S.lastIndexOf("0")==-1){
                    num1 = num1.toFixed(3);
                }
                console.log("tiene mas de 4 decimales"+num1S.lastIndexOf("0"));
            }else{
                console.log("tiene menos de 4 decimales");
            }

            
                    
                
            num2 = nume2;
            console.log(num1);
            res = num1 * num2;
            break;
        case "velocidad":
            num1 = transformacionD(nume1, inumD.value, inumV.value);
            num2 = transformacionT(nume2, inumT.value, inumV.value);
            console.log(num1 + "," + num2);
            res = num1 / num2;
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