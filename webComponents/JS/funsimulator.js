var numObj = document.getElementById("num-obj");
const idTitulo = document.getElementById("id-title-simu");
let crearObj = document.querySelector(".obj");
let generar = document.getElementById("btn-gen");
let calcular = document.getElementById("btn-simu");
let conSimS = document.querySelector(".cont-simu-street");
let frag = document.createDocumentFragment();
var cont = false;
generar.addEventListener("click", () => {
    cont =true; // La variable detecta el click en el boton generar para cambiar la leyenda del titlo "Simulador en espera de objetos"
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
        objUni.appendChild(contInfoObj); //Agregamos los inputs necesarios segun la seleccion de elementos
        const div = document.createElement("DIV");
        div.classList.add("cont-calle");
        div.id = "street"
        div.innerHTML = `<label class="eti-a">Auto `+(i+1)+`</label><div class="cont-auto cont-auto-`+i+`"><img src="../IMG/Simulator/componente-auto-` + i + `.png"  class="auto-simu"></div><img src="../IMG/Simulator/componente-asfalto.png">`;
        frag.appendChild(div); // Agregamos las diferentes pistas con los autos segun la seleccion de elementos
        idTitulo.textContent = "Simulación 2D";
        idTitulo.classList.add("traslation-tittle");
    }
    crearObj.appendChild(objUni);
    conSimS.appendChild(frag);
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

