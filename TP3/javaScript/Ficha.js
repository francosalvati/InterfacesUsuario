class Ficha extends Pieza {

    constructor(ctx, x, y, w, h, jugador, color) {
        super(ctx, x, y, w, h)
        this.radio = w / 2
        this.jugador = jugador
        this.color = color
        this.posXfin = x
        this.posYfin = y
    }

    setColor(color){
        this.color = color
    }

    draw(nColor) {
        nColor?
        this.ctx.fillStyle = nColor:
        this.ctx.fillStyle = this.color

        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    ClickOn(posX, posY) {
        let dist = Math.sqrt(Math.pow(posX - this.x, 2) + Math.pow(posY - this.y, 2))
        if (dist <= this.radio) {
            return this
        }
        return null
    }

    cambiarPos(posX, posY){
        this.x = posX
        this.y = posY
        this.draw()
    }

    soltarFicha(){
        // this.x = posX
        // this.y = posY

        // this.draw()
    }

    volverPos(){

    }
}