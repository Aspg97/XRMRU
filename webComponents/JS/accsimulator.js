const btn_play = document.getElementById("btn-ini-simu");



// INICIO >>> CREACION DEL METODO MOVER AUTO
btn_play.addEventListener("click", () => {
    //Se recogen los datos esperados del numero mayor de distancia y tiempo de los inputs
    let maxmimos = mayores();
    let maxD = maxmimos[0];
    let maxT = maxmimos[1];
    //console.log(maxD+","+maxT);
    //Se pasan por parametros los datos recogidos para realizar el calculo del desplazamiento
    mover(maxD, maxT);
});
// FIN >>> CREACION DEL METODO MOVER AUTO

// INICIO >>> CREACION DEL METODO (COMPLEMENTARIO:btn_play) PARA OBTENER EL NUMERO MAXIMO DE LOS INPUTS DISTANCIA TIEMPO
const mayores = () => {
    let inputValueDMax = 0;
    let inputValueTMax = 0;
    console.log(inputValueDMax + " , " + inputValueTMax);
    for (let i = 0; i < numObj.value; i++) {
        let idInpDis = "inpD" + i;
        let idInpTem = "inpT" + i;
        const distancia = document.getElementById(idInpDis);
        const tiempo = document.getElementById(idInpTem);
        console.log(i + " >>>> " + distancia.value + "," + tiempo.value);
        if (parseFloat(distancia.value) > inputValueDMax) {
            inputValueDMax = parseFloat(distancia.value);
        }
        if (parseFloat(tiempo.value) > inputValueTMax) {
            inputValueTMax = parseFloat(tiempo.value);
        }
    }
    //console.log(inputValueDMax+" , "+inputValueTMax);
    return [inputValueDMax, inputValueTMax];
}
// FIN >>> CREACION DEL METODO (COMPLEMENTARIO:btn_play) PARA OBTENER EL NUMERO MAXIMO DE LOS INPUTS DISTANCIA TIEMPO

// INICIO >>> CREACION DE LA FUNCION PARA MOVER EL OBJETO
const mover = (maxD, maxT) => {

    let despRight1 = 0;
    let despRight2 = 0;
    let despRight3 = 0;
    let despRight4 = 0;
    const wStreet = document.getElementById("street").clientWidth;
    const wAu = document.querySelector(".cont-auto").clientWidth;
    let tiemposInput = [];
    let distanciasInput = [];
    for (let i = 0; i < numObj.value; i++) {
        let idInpDis = "inpD" + i;
        let idInpTem = "inpT" + i;
        const inDistancia = document.getElementById(idInpDis);
        const inTiempo = document.getElementById(idInpTem);
        tiemposInput.push(parseFloat(inTiempo.value));
        distanciasInput.push(parseFloat(inDistancia.value) * wStreet / maxD);
    }

    try {

        const at1 = document.querySelector(".cont-auto-0");
        const at2 = document.querySelector(".cont-auto-1");
        const at3 = document.querySelector(".cont-auto-2");
        const at4 = document.querySelector(".cont-auto-3");
        //disMA1 = distanciasInput[0];

        function desplazamiento1() {
            let tiempo = 5;
            let cuadro = 1;
            despRight1 += tiempo * cuadro;
            if (distanciasInput[0] < despRight1 + wAu) {
                console.log("Parando auto 1");
                cancelAnimationFrame(animacion);
            }
            at1.style.right = despRight1 + "px"
            let animacion = requestAnimationFrame(desplazamiento1);
        }
        desplazamiento1();

        function desplazamiento2() {
            let tiempo = 5;
            let cuadro = 1;
            despRight2 += tiempo * cuadro;
            if (distanciasInput[1] < despRight2 + wAu) {
                console.log("Parando auto 2");
                cancelAnimationFrame(animacion);
            }
            at2.style.right = despRight2 + "px"
            let animacion = requestAnimationFrame(desplazamiento2);
        }
        desplazamiento2();

        function desplazamiento3() {
            let tiempo = 5;
            let cuadro = 1;
            despRight3 += tiempo * cuadro;
            if (distanciasInput[2] < despRight3 + wAu) {
                console.log("parando auto 3");
                cancelAnimationFrame(animacion);
            }
            at3.style.right = despRight3 + "px"
            let animacion = requestAnimationFrame(desplazamiento3);
        }
        desplazamiento3();

        function desplazamiento4() {
            let tiempo = 5;
            let cuadro = 1;
            despRight4 += tiempo * cuadro;
            if (distanciasInput[3] < despRight4 + wAu) {
                console.log("parando auto 4");
                cancelAnimationFrame(animacion);
            }
            at4.style.right = despRight4 + "px"
            let animacion = requestAnimationFrame(desplazamiento4);
        }
        desplazamiento4();

    } catch (error) {
        console.log("No se utilizaron todos los elementos");
    }



    for (tiempos in tiemposInput) {
        //console.log(tiemposInput[tiempos]);
    }
    /*
        for(distancias in distanciasInput){
            console.log(distanciasInput[distancias]);
        }*/
    //console.log("Desde mover: "+wStreet + "," + wAu);
}
