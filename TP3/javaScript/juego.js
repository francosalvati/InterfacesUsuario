
let canvas = document.querySelector('.canvas')
let ctx = canvas.getContext('2d')

let tablero = new Tablero(ctx, 200, 100, 70, 70, 7, 6, 'aaa')

tablero.crearTablero()
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
        fichaActiva.arrastrarPos(posX, posY)
        tablero.drawCajadeJuego()
        drawAllMove()
    }
})


canvas.addEventListener('mouseup', (e) => {
    if (fichaActiva) {
        if(fichaActiva.soltarFicha(tablero.checkSoltar(fichaActiva))){
            tablero.setTurno()
        }
    }
    fichaActiva = null
})


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


