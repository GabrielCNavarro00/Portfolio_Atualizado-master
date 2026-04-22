let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

var img = new Image();
img.src = "bola.png";

var bola = {
    x: 150,
    y: 150,
    w: 50,
    h: 50,
};

function desenha_bola(){
    c.drawImage(img, bola.x, bola.y, bola.w, bola.h);
}

function desenhar(){
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (bola.x < 0) {
        bola.x = 0;
    }

    if (bola.x > canvas.width - bola.w) {
        bola.x = canvas.width - bola.w;
    }

    if (bola.y < 0) {
        bola.y = 0;
    }

    if (bola.y > canvas.height - bola.h) {
        bola.y = canvas.height - bola.h;
    }

    desenha_bola();

    requestAnimationFrame(desenhar);

}

document.addEventListener("mousemove", function(evento){
    let rect = canvas.getBoundingClientRect();

    var x_mouse = evento.clientX - rect.left;
    var y_mouse = evento.clientY - rect.top;

    bola.x = x_mouse - bola.w/2;
    bola.y = y_mouse - bola.h/2;
});

img.onload = function(){
    desenhar();
};