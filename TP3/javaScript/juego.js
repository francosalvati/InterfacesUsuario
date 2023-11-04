
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
        tablero.drawCajadeJuego()
        drawAllMove()
    }
})


canvas.addEventListener('mouseup', (e) => {
    if (fichaActiva) {
        if(fichaActiva.soltarFicha(tablero.checkCaja(fichaActiva))){
            setInterval(()=>{
            })
            tablero.setTurno()
        }
    }
    fichaActiva = null
    drawAll()
})

function animationSoltarFicha(){
    
    tablero.checkWin(new Ficha(this.ctx, 100 + 1 * 7, 550, 40, 40, 1), 1)
}

function drawAllMove() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tablero.draw()
    tablero.drawCajadeJuego()
    tablero.dibujarFichas()
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tablero.dibujarFichas()
    tablero.draw()
}


