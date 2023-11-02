
let canvas = document.querySelector('.canvas')
let ctx = canvas.getContext('2d')


let tablero = new Tablero(ctx, 200, 100, 70, 70, 7, 6, 'aaa')
tablero.createTablero()
tablero.draw()

tablero.crearFichas()

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
        fichaActiva.cambiarPos(posX, posY)
        drawAll()
        tablero.drawCajadeJuego()
    }
})


canvas.addEventListener('mouseup', (e) => {
    if (fichaActiva) {
        let posX = e.offsetX
        let posY = e.offsetY
        if (tablero.checkCaja(posX, posY)) {

        }
        fichaActiva.soltarFicha()
    }
    fichaActiva = null
    drawAll()
})

// funciones del juego

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tablero.dibujarFichas()
    tablero.draw()
}

