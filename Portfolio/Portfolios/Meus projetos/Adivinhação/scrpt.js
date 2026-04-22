let numero = Math.floor(Math.random() * 101);
function x(){
    let y = parseInt(document.getElementById("num").value);
    let z = "numero";
    if(y < numero){
        z = "Valor muito baixo";
        document.getElementById("resp").style.setProperty("background-color","red");
    }
    else
        if(y > numero){
            z = "Valor muito alto";
            document.getElementById("resp").style.setProperty("background-color","red");
        }
        else
            if(y === numero){
                z = "acertou";
                document.getElementById("resp").style.setProperty("background-color","green");
            }
    document.getElementById("resp").innerHTML = z
}