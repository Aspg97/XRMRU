const btnAuto = document.getElementById("btn-auto");
const btnPerf = document.getElementById("btn-per");
//INICIO PROCESO >> estilo seleccion tipo de generar
var slcAuto = true;
var slcPerf = false;

btnPerf.addEventListener("click", () => {
    btnSelected(slcAuto, slcPerf);
});

btnAuto.addEventListener("click", () => {
    btnSelected(slcAuto, slcPerf);
});

function btnSelected(auto, perf) {
    if (auto == true && perf == false) {
        btnAuto.style.borderBottom = "none";
        btnPerf.style.borderBottom = "solid 5px #034492";
        slcAuto = false;
        slcPerf = true;
    } else {
        if (auto == false && perf == true) {
            btnPerf.removeAttribute("style");
            btnAuto.setAttribute("style", "border-bottom: solid 5px var(--first-color);");
            slcAuto = true;
            slcPerf = false;
        }
    }
}
