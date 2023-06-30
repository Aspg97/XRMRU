const dirPa = window.location.href;
const foot = document.querySelector(".footer-page");
const menu = document.querySelector(".cont-nav-items");
const btnMenu = document.querySelector(".menu-responsive");
const listaMenu = document.querySelector(".nav-items");
let nomPag = dirPa.substring(dirPa.lastIndexOf("/") + 1, dirPa.length);
let index = document.getElementById('page-ini');
let simulator = document.getElementById('page-sim');
let pzdg = document.getElementById('page-pzdg');
let gr = document.getElementById('page-gr');

switch (nomPag) {
    case 'simulador.html':
        simulator.style.backgroundColor = "#0070C2";
        simulator.style.color = "#fff";
        break;
    case 'index.html':
        index.style.backgroundColor = "#0070C2";
        index.style.color = "#fff";
        break;
    case 'pizarraDigital.html':
        pzdg.style.backgroundColor = "#0070C2";
        pzdg.style.color = "#fff";
        break;
    case 'graficadora.html':
        gr.style.backgroundColor = "#0070C2";
        gr.style.color = "#fff";
        break;
    default:
        index.style.backgroundColor = "#0070C2";
        index.style.color = "#fff";
}
//>>identificar cuando el tamano es pequeno
window.addEventListener("resize", () => {
    if (window.innerWidth > 750) {
        listaMenu.style.display = "flex";
    } else {
        listaMenu.style.display = "none";
    }
});
//INICIO PROCESO >> Vista de menu
window.addEventListener("scroll", () => {
    if (window.innerWidth > 750) {
        if (window.scrollY > 80) {
            menu.style.position = "fixed";
            menu.style.top = "0";
        } else {
            menu.removeAttribute("style");
        }
    }
});
//>> Menu responsive
let desplegar = false
btnMenu.addEventListener("click", () => {
    if (desplegar === false) {
        menu.style.width = "100%";
        menu.style.height = "auto";
        menu.style.borderRadius = "0px";
        btnMenu.style.marginBottom = "5px";
        listaMenu.style.display = "flex";
        desplegar = true;
    } else {
        menu.removeAttribute("style");
        listaMenu.style.display = "none";
        desplegar = false;
    }
});
//>> Detectar si está en dispositivos moviles
let disp = false;
function dispDetected(){
    if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){
        console.log("dispositivo");
        disp = true;
    }else{
        console.log("no dispositivo");
    }
    return disp;
}
