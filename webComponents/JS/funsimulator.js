var numObj = document.getElementById("num-obj");
const idTitulo = document.getElementById("id-title-simu");
const backTitulo = document.querySelector(".cont-subtitle-state");
const contDate = document.getElementById("cont-date-obj");
let crearObj = document.querySelector(".obj");
let generar = document.getElementById("btn-gen");
let calcular = document.getElementById("btn-simu");
let conSimS = document.querySelector(".cont-simu-street");
let frag = document.createDocumentFragment();



generar.addEventListener("click", () => {
    crearObj.innerHTML = "";
    conSimS.innerHTML = "";
    console.log("Se genero " + numObj.value + " elementos");
    const objUni = document.createDocumentFragment();
    for (let i = 0; i < numObj.value; i++) {
        const contInfoObj = document.createElement("DIV");
        contInfoObj.innerHTML =
            `<div class="mos-obj" id="mos-obj-uni">
                <label>Auto #`+ (i + 1) + `</label>
                <div class="cont-inp" id="cont-inp-info">
                    <div class="cont-inp-info-par">
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
                    </div>
                    <div class="cont-inp-info-par">
                    <input type="number" class="inpO" value="" id="inpD`+ i + `">
                    <select class="opt-um" id="umD`+ i + `">
                        <option>km</option>
                        <option>m</option>
                        <option>cm</option>
                    </select>
                    </div>
                    <div class="cont-inp-info-par">
                    <input type="number" class="inpO" value="" id="inpT`+ i + `">
                    <select class="opt-um" id="umT`+ i + `">
                        <option>h</option>
                        <option>s</option>
                        <option>m</option>
                    </select>
                    </div>
                </div>
            </div>`;
        objUni.appendChild(contInfoObj); //Agregamos los inputs necesarios segun la seleccion de elementos
        const div = document.createElement("DIV");
        div.classList.add("cont-calle");
        div.id = "street"
        div.innerHTML = `<label class="eti-a">Auto ` + (i + 1) + `</label><div class="cont-auto cont-auto-` + i + `"><img src="../IMG/Simulator/componente-auto-` + i + `.png"  class="auto-simu"></div><img src="../IMG/Simulator/componente-asfalto.png">`;
        frag.appendChild(div); // Agregamos las diferentes pistas con los autos segun la seleccion de elementos
    }
    crearObj.appendChild(objUni);
    conSimS.appendChild(frag);
    idTitulo.textContent = "Llena mínimo 2 datos de cada objeto";
    backTitulo.style.backgroundImage = 'url("../IMG/Simulator/fondo-estado-amarillo.png")';
});
//let conInp = document.getElementById("cont-inp-info");
let op;
let afi; // Variable para activar el boton de play
calcular.addEventListener("click", () => {
    console.log("Calculando");
    for (let i = 0; i < numObj.value; i++) {
        if ((idInputs(i)[0].value == "" & idInputs(i)[1].value == "") || (idInputs(i)[0].value == "" & idInputs(i)[2].value == "") || (idInputs(i)[1].value == "" & idInputs(i)[2].value == "")) {
            alert("Llene almenos 2 datos de cada objeto");
            afi=false
            break;
        } else if (idInputs(i)[0].value != "" & idInputs(i)[1].value != "") {
            op = "tiempo";
            idInputs(i)[2].value = definirOP(idInputs(i)[0].value, idInputs(i)[1].value, op, i);
            afi = true;

        } else if (idInputs(i)[0].value != "" & idInputs(i)[2].value != "") {
            op = "distancia";
            idInputs(i)[1].value = definirOP(idInputs(i)[0].value, idInputs(i)[2].value, op, i);
            afi = true;

        } else if (idInputs(i)[1].value != "" & idInputs(i)[2].value != "") {
            op = "velocidad";
            idInputs(i)[0].value = definirOP(idInputs(i)[1].value, idInputs(i)[2].value, op, i);
            afi = true;
        }
    }
    activarBtnPlay(afi);
});
//INICIO PROCESO >> para empezar el movimiento y aplicar estilos al btn play
contDate.addEventListener("keyup", () => {
    for (let i = 0; i < numObj.value; i++) {
        if ((idInputs(i)[0].value == "" & idInputs(i)[1].value == "") || (idInputs(i)[0].value == "" & idInputs(i)[2].value == "") || (idInputs(i)[1].value == "" & idInputs(i)[2].value == "")) {
            afi = false;
            idTitulo.textContent = "Llena mínimo 2 datos de cada objeto";
            backTitulo.style.backgroundImage = 'url("../IMG/Simulator/fondo-estado-amarillo.png")';
            console.log("faltan datos");
            break;
        } else if (idInputs(i)[1].value == "") {
            idTitulo.textContent = "Se necesita de una distancia";
            backTitulo.style.backgroundImage = 'url("../IMG/Simulator/fondo-estado-amarillo.png")';
            afi = false;
            break;
        }else if (idInputs(i)[0].value == "") {
            idTitulo.textContent = "Se necesita de una velocidad";
            backTitulo.style.backgroundImage = 'url("../IMG/Simulator/fondo-estado-amarillo.png")';
            afi = false;
            break;
        } 
        else {
            afi = true;
            console.log("datos minimos completados");
        }
    }
    activarBtnPlay(afi);
});
//FIN PROCESO >> para empezar el movimiento y aplicar estilos al btn play
