const cantX = document.getElementById("select-cant-x");
const cantY = document.getElementById("select-cant-y");
const btnGen = document.getElementById("gen-graph");
btnGen.addEventListener("click", () => {
    let numY = parseInt(cantY.value); // Recoge la cantidad de datos que se van a graficar en Y
    let numX = parseInt(cantX.value); // Recoge la cantidad de datos que se van a graficar en X
    console.log(numY + "---" + numX);
    if (numY > numX) {
        alert("Asegurese de que los valores del eje Y no superen a los valores del eje X");
    } else {
        console.log("Esta bien");
    }
});