const dirPa = window.location.href;
let nomPag = dirPa.substring(dirPa.lastIndexOf("/") + 1, dirPa.length);
let index = document.getElementById('page-ini');
let simulator = document.getElementById('page-sim');
let rv = document.getElementById('page-RV');

switch (nomPag) {
    case 'simulador.html':
        simulator.style.backgroundColor = "#034492";
        simulator.style.color = "#fff";
        break;
    case 'index.html':
        index.style.backgroundColor = "#034492";
        index.style.color = "#fff";
        break;
    default: console.log(nomPag);

}

//alert('Ya estas en simulador --->>' + nomPag);

