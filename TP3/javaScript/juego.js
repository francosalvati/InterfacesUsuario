let canvas = document.querySelector('.canvas')
let ctx = canvas.getContext('2d')

const tiempoElement = document.getElementById('tiempo');
let tiempoRestante = 10; // Establece la duración del juego en segundos
let juegoEnCurso = false;

let tablero = new Tablero(ctx, 400, 100, 90, 90, 6, 6)

document.getElementById("aplicarCambios").addEventListener("click", function () {
    const fichaSize = parseInt(document.getElementById("fichaSize").value);
    const lineasGanar = parseInt(document.getElementById("lineasGanar").value);
    const filasTablero = parseInt(document.getElementById("filasTablero").value);
    const columnasTablero = parseInt(document.getElementById("columnasTablero").value);

    // Aplicar los cambios a los parámetros del juego
    tablero.actualizarParametros(fichaSize, lineasGanar, filasTablero, columnasTablero);
});

tablero.crearTablero()
tablero.crearFichas()
drawAll();

let fichaActiva = null

canvas.addEventListener("mousedown", (e) => {
    let posX = e.offsetX
    let posY = e.offsetY
    fichaActiva = tablero.buscarFicha(posX, posY)
})

canvas.addEventListener("mousemove", (e) => {
    if (fichaActiva) {
        let posX = e.offsetX
        let posY = e.offsetY
        fichaActiva.arrastrarPos(posX, posY)
        tablero.drawCajadeJuego()
        drawAllMove()
    }
})

canvas.addEventListener('mouseup', (e) => {
    if (fichaActiva) {
        if (fichaActiva.soltarFicha(tablero.checkSoltar(fichaActiva))) {
            setTimeout(() => {
                tablero.handleMove(tablero.turno);
                tablero.setTurno();
            }, 800);
        }
        fichaActiva = null;
    }
    drawAll()
});

function drawAllMove() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tablero.draw()
    tablero.drawCajadeJuego()
    tablero.drawFichas()
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tablero.drawFichas()
    tablero.draw()
}