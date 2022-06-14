

let tarjetaDestapada=0
let tarjeta1=null;
let tarjeta2=null;
let primerDato=null;
let segundoDato=null;
let acierto=0;
let tiemer=60;
let regre=false;
let tempo=false;
let movim=0


let sonido= new Audio('./audio/sound.wav');
let fallido= new Audio('./audio/fallido.wav');
let fin= new Audio('./audio/fin.wav');
let toque= new Audio('./audio/toque.wav');
let victory= new Audio('./audio/victory.wav');

let numeros=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    numeros.sort(function(){return Math.random()-.5})

// console.log(numeros)

// FUNCIONES
function crono(){
  regre= setInterval(function(){
    tiemer--;
    document.getElementById("t-restante").innerHTML=`Tiempo restante: <strong>${tiemer}</strong> segundos`;

    if(tiemer==0){
        clearInterval(regre);
        document.getElementById('t-restante').innerHTML="Tu tiempo se ha acabado, por favor Vuelva a intenterlo!"
        bloqTarj()
        document.querySelector('.barra').style.background="rgb(255, 47, 47)";
 
        document.getElementById('t-restante').style.color="red"

       }
   },1000)

}
function animar(){
    document.querySelector('.vida').classList.add('vid')
}
function bloqTarj(){
    for(let i=0;i<=15;i++){
        let tar=document.getElementById(i);
        tar.innerHTML=`<img src="./imagenes2/${numeros[i]}.png">`;
        tar.disabled=true;
        fin.play()
    }
}
function destapar(id){
    animar()
    if(tempo==false){
        crono()
       tempo=true
    }
    tarjetaDestapada++
    // console.log(tarjetaDestapada)
     if(tarjetaDestapada==1){
    toque.play()

        tarjeta1=document.getElementById(id);
        primerDato=numeros[id];
        tarjeta1.innerHTML=`<img src="./imagenes2/${primerDato}.png">`
        tarjeta1.disabled=true

     }else if(tarjetaDestapada==2){
    toque.play()

        if(primerDato==segundoDato){
            sonido.play()
        }
     tarjeta2=document.getElementById(id);
     segundoDato=numeros[id];
     tarjeta2.innerHTML=`<img src="./imagenes2/${segundoDato}.png">`
      tarjeta2.disabled=true
      
      movim++;
      document.getElementById('movimientos').innerHTML=`Movimientos: <strong>${movim}</strong>`;
     
      if(primerDato==segundoDato){
        toque.pause()
        sonido.play()
        tarjetaDestapada=0
        tarjeta1.style.background="rgb(2, 100, 2)";
        tarjeta2.style.background="rgb(2, 100, 2)";
        acierto++;
        document.getElementById('aciertos').innerHTML=`Aciertos: <strong>${acierto}</strong>`;
        if(acierto==8){
            clearInterval(regre)
            victory.play()
            document.querySelector('.vida').classList.remove('vid')
            document.querySelector('.barra').style.background="rgb(173, 255, 47)";
            document.querySelector('#aciertos').innerHTML=`<strong>Felicidades</strong> 👏👏👏 lo haz logrado.`;
            document.querySelector('#aciertos').style.color="rgb(171, 3, 197)";

        }
     }else{
        setTimeout(function(){
            tarjeta1.innerHTML="?";
            tarjeta2.innerHTML="?";
            tarjeta1.disabled=false;
            tarjeta2.disabled=false;
            tarjetaDestapada=0
        },800)
     }
     }

}
document.querySelector(".reset").addEventListener("click",function(){
    reiniciar()
})
function reiniciar(){
    window.location.reload()
}