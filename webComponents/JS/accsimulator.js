let conSimS = document.querySelector(".cont-simu-street");
let btn_gene= document.getElementById("btn-gen");
let numObjt = document.getElementById("num-obj");
let frag = document.createDocumentFragment();
let btn_play = document.getElementById("btn-ini-simu");


btn_gene.addEventListener("click",()=>{
    conSimS.innerHTML="";
   console.log(numObj.value);
   for(let i = 0 ; i<numObjt.value ; i++){
        const div = document.createElement("DIV");
        div.classList.add("cont-calle");
        div.innerHTML=`<div class="cont-auto" id="at-`+i+`"><img src="../IMG/Simulator/componente-auto-`+i+`.png"  class="auto-simu"></div><img src="../IMG/Simulator/componente-asfalto.png">`;
        frag.appendChild(div);
   }
   conSimS.appendChild(frag);
});

btn_play.addEventListener("click", () => {
    console.log("Recorriendo");
    let continuar = false;
    for (let i = 0; i < numObj.value; i++) {
        let idV = "inpV" + i;
        let idD = "inpD" + i;
        let idT = "inpT" + i;
        let at = "at-" + i;
        const inpV = document.getElementById(idV);
        const inpD = document.getElementById(idD);
        const inpT = document.getElementById(idT);
        if (inpV.value == "" || inpT.value == "" || inpD.value == "") {
            alert("Primero llena todos los datos");
        }else{
            continuar=true;  
        }
    }

    if(continuar==true){
        //const atV = document.getElementById(at);
        //console.log(atV.style.left);
            setInterval(mover,1000);
        //console.log(atV.style.left);  
    }
});

function mover (){
    console.log("hola");
    id.style.rigth = id.style.rigth+(1+"px");
}