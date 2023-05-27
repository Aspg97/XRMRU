const btnAuto = document.getElementById("btn-auto");
const btnPerf = document.getElementById("btn-per");
const btnGen = document.getElementById("gen-graph");
const contDateGraph = document.querySelector(".cont-date-graph");
const contInfoGraph = document.querySelector(".cont-info-graph");
const contGraph = document.querySelector(".cont-graph");

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
ini(); // Inicializacion de canvas
//INICIO PROCESO >> accion del boton generar
var numSeg = 5;
btnGen.addEventListener("click", () => {
    console.log("has presionado generar");

});
//FIN PROCESO >> accion del boton generar
