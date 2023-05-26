const btnAuto = document.getElementById("btn-auto");
const btnPerf = document.getElementById("btn-per");

var slcAuto = true; // Variable para seleccion de modo
//INICIO PROCESO >> cuando el usuario selecciona personalizado
btnPerf.addEventListener("click", () => {
    slcAuto = true;
    btnSelected(slcAuto);
});
//FIN PROCESO >> cuando el usuario selecciona personalizado
//INICIO PROCESO >> cuando el usuario selecciona automatico
btnAuto.addEventListener("click", () => {
    slcAuto = false;
    btnSelected(slcAuto);
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
