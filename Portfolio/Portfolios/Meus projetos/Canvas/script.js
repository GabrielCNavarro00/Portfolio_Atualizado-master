let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

function quadrado(ctx, x, y, cor, largura, altura){
    ctx.beginPath();
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, altura, largura);
    ctx.closePath();
}
quadrado(c, 0, 0, 'blue', 60, 60)
quadrado(c, 240, 0, 'red', 60, 60)
quadrado(c, 0, 120, 'cyan', 60, 30)
quadrado(c, 270, 135, 'cyan', 30, 30)
quadrado(c, 0, 240, 'yellow', 60, 30)
quadrado(c, 30, 270, 'yellow', 30, 30)
quadrado(c, 270, 240, 'black', 60, 30)
quadrado(c, 240, 270, 'black', 30, 30)
quadrado(c, 110, 150, 'red', 40, 40)

function linha(ctx, startx, starty, endx, endy, cor){
    ctx.beginPath();
    ctx.strokeStyle = cor;
    ctx.moveTo(startx, starty);
    ctx.lineTo(endx, endy);
    ctx.stroke();
}
linha(c, 0, 0, 150, 150, 'blue')
linha(c, 300, 0, 150, 150, 'red')
linha(c, 0, 150, 300, 150, 'green')
linha(c, 150, 150, 150, 300, "grey")

function circulo(ctx, x, y, raio, corPreenchimento, corBorda, larguraBorda = 1, start = 0, end = 2, counter = false) {
    ctx.beginPath();

    ctx.arc(x, y, raio, start * Math.PI, end * Math.PI , counter)

    if (corPreenchimento) {
        ctx.fillStyle = corPreenchimento;
        ctx.fill();
    }

    if (corBorda) {
        ctx.strokeStyle = corBorda;
        ctx.lineWidth = larguraBorda;
        ctx.stroke();
    }

    ctx.closePath()
}

circulo(c, 150, 120, 15, "cyan", "blue", 1, 0, 2)
circulo(c, 225, 225, 15, "yellow", "green", 1, 0, 2)
circulo(c, 75, 225, 15, "yellow", "green", 1, 0, 2)
circulo(c, 150, 150, 70, null, "green", 1, 1, 1.25)
circulo(c, 150, 150, 70, null, "green", 1, 2, 1.75, true)
circulo(c, 150, 150, 50, null, "green", 1, 1, 2)
circulo(c, 150, 300, 40, "cyan", "green", 1, 1, 2)
circulo(c, 150, 300, 70, null, "green", 1, 1, 1.5)
circulo(c, 150, 300, 60, null, "green", 1, 2, 1.5, true)


const c2 = document.getElementById("canvas2");
const ctx = c2.getContext("2d");

// funções genéricas
function ret(x, y, w, h, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, w, h);
}

function circ(x, y, r, cor) {
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}

function tri(x1, y1, x2, y2, x3, y3, cor) {
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
}

// cenário
ret(0, 0, 400, 400, "#87CEB6");     // céu
ret(0, 300, 400, 100, "gray");      // chão

// água
ret(0, 350, 150, 50, "#5A84D6");
ret(0, 300, 50, 100, "#5A84D6");
circ(0, 300, 50, "#5A84D6");
circ(150, 400, 50, "#5A84D6");

// sol
circ(300, 100, 50, "yellow");

// casa
ret(150, 200, 100, 100, "#8B4513"); // base
tri(150, 200, 200, 150, 250, 200, "#E76F51"); // telhado
ret(185, 240, 30, 60, "#5C3A1E"); // porta
ret(155, 210, 30, 30, "#87CEFA"); // janela esquerda
ret(215, 210, 30, 30, "#87CEFA"); // janela direita

// árvores
function arvore(xTronco, yTronco, xCopa, yCopa) {
    ret(xTronco, yTronco, 20, 60, "#8B4513");
    circ(xCopa, yCopa, 30, "green");
}

arvore(50, 240, 60, 230);   // esquerda
arvore(330, 260, 340, 250); // direita
