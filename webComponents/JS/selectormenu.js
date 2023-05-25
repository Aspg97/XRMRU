const dirPa = window.location.href;
const foot = document.querySelector(".footer-page");
const body = document.querySelector("body");
const menu = document.querySelector(".cont-nav-items");
//const full = document.getElementById("fullscreen");
let nomPag = dirPa.substring(dirPa.lastIndexOf("/") + 1, dirPa.length);
let index = document.getElementById('page-ini');
let simulator = document.getElementById('page-sim');
let rv = document.getElementById('page-RV');

switch (nomPag) {
    case 'simulador.html':
        simulator.style.backgroundColor = "#0070C2";
        simulator.style.color = "#fff";
        break;
    case 'index.html':
        index.style.backgroundColor = "#0070C2";
        index.style.color = "#fff";
        break;
    case 'app.html':
        rv.style.backgroundColor = "#0070C2";
        rv.style.color = "#fff";
        break;
    default: console.log(nomPag);

}
ubicacionFooter();
//INICIO PROCESO >> Vista de footer
function ubicacionFooter() {
    let heightWin = document.documentElement.clientHeight;
    let heightDoc = body.clientHeight;
    console.log(heightDoc + "--" + heightWin);
    if (heightDoc < heightWin) {
        foot.style.position = "absolute";
        foot.style.bottom = "0";
    } else {
        foot.removeAttribute("style");
    }
}
//FIN PROCESO >> Vista de footer
//INICIO PROCESO >> Vista de menu
window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        menu.style.position = "fixed";
        menu.style.top = "0";
    } else {
        menu.removeAttribute("style");
    }
});
//FIN PROCESO >> Vista de menu

