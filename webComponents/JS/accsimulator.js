const btn_play = document.getElementById("btn-ini-simu");
// INICIO >>> CREACION DEL METODO MOVER AUTO
btn_play.addEventListener("click", () => {
    //Se pasan por parametros los datos recogidos para realizar el calculo del desplazamiento
    mover(mayores()[0], mayores()[1]);
});
// FIN >>> 

// INICIO >>> CREACION DEL METODO (COMPLEMENTARIO:btn_play) PARA OBTENER EL NUMERO MAXIMO DE LOS INPUTS DISTANCIA TIEMPO
const mayores = () => {
    let inputValueDMax = 0;
    let inputValueVMax = 0;
    let inputValueVMin = 0;
    //console.log(inputValueDMax + " , " + inputValueVMax);
    for (let i = 0; i < numObj.value; i++) {
        let idInpDis = "inpD" + i;
        let idInpVel = "inpV" + i;
        const distancia = document.getElementById(idInpDis);
        const velocidad = document.getElementById(idInpVel);
        //console.log(i + " >>>> " + distancia.value + "," + velocidad.value);
        if (parseFloat(distancia.value) > inputValueDMax) {
            inputValueDMax = parseFloat(distancia.value);
        }
        if (parseFloat(velocidad.value) > inputValueVMax) {
            inputValueVMax = parseFloat(velocidad.value);
        }
    }
    inputValueVMin = inputValueVMax; 
    for (let i = 0; i < numObj.value; i++) {
        let idInpVel = "inpV" + i;
        const velocidad = document.getElementById(idInpVel);
        //console.log(i + " >>>> " + velocidad.value);
        if (parseFloat(velocidad.value) < inputValueVMin) {
            inputValueVMin = parseFloat(velocidad.value);
        }
    }
    //console.log(inputValueDMax+" , "+inputValueTMax);
    return [inputValueDMax, inputValueVMax];
}
// FIN >>>

// INICIO >>> CREACION DE LA FUNCION PARA MOVER EL OBJETO
const mover = (maxD, maxV) => {
    // INICIO SUBPROCESO >> Para alamacenar los datos de los inputs de velocidad y distancia ya a proporcion para la implementacion en el movimiento
    const wStreet = document.getElementById("street").clientWidth;
    let wAu = document.querySelector(".cont-auto").clientWidth;
    // FIN >>
    // Declaracion de variables para el desplazamiento de los autos !PROXIMO A MEJORAR
    let despRight1 = -wAu;
    let despRight2 = -wAu;
    let despRight3 = -wAu;
    let despRight4 = -wAu;
    console.log(despRight1);
    //INICIO SUB PROCESO >> para movimiento de cada elemento
    try {
        const at1 = document.querySelector(".cont-auto-0");
        const at2 = document.querySelector(".cont-auto-1");
        const at3 = document.querySelector(".cont-auto-2");
        const at4 = document.querySelector(".cont-auto-3");
        // Desplazamiento auto 1
        function desplazamiento1() {
            let tiempo = velocidades(maxV)[0];
            let cuadro = 1;
            despRight1 += tiempo * cuadro;
            if (distancias(maxD,wStreet)[0] < despRight1 + wAu) {
                console.log("Parando auto 1");
                cancelAnimationFrame(animacion);
            }
            at1.style.right = despRight1 + "px"
            let animacion = requestAnimationFrame(desplazamiento1);
        }
        desplazamiento1();
        // Desplazamiento auto 2
        function desplazamiento2() {
            let tiempo = velocidades(maxV)[1];
            let cuadro = 1;
            despRight2 += tiempo * cuadro;
            if (distancias(maxD,wStreet)[1] < despRight2 + wAu) {
                console.log("Parando auto 2");
                cancelAnimationFrame(animacion);
            }
            at2.style.right = despRight2 + "px"
            let animacion = requestAnimationFrame(desplazamiento2);
        }
        desplazamiento2();
        // Desplazamiento auto 3
        function desplazamiento3() {
            let tiempo = velocidades(maxV)[2];
            let cuadro = 1;
            despRight3 += tiempo * cuadro;
            if (distancias(maxD,wStreet)[2] < despRight3 + wAu) {
                console.log("parando auto 3");
                cancelAnimationFrame(animacion);
            }
            at3.style.right = despRight3 + "px"
            let animacion = requestAnimationFrame(desplazamiento3);
        }
        desplazamiento3();
        // Desplazamiento auto 4
        function desplazamiento4() {
            let tiempo = velocidades(maxV)[3];
            let cuadro = 1;
            despRight4 += tiempo * cuadro;
            if (distancias(maxD,wStreet)[3] < despRight4 + wAu) {
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
}
// FIN >>>