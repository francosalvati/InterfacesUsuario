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

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }

    getFicha(posX, posY, jugador) {
        let dist = Math.sqrt(Math.pow(posX - this.x, 2) + Math.pow(posY - this.y, 2))
        if (dist <= this.radio && this.jugador == jugador) {
            return this
        }
        return null
    }

    cambiarPos(posX, posY){
        this.x = posX
        this.y = posY
    }

    soltarFicha(pos){
        if(!pos.length < 1){
            this.x = pos[0]
            this.y = pos[1]
            this.posXfin = this.x
            this.posYfin = this.y
            return true
        }
        else{
            this.x = this.posXfin
            this.y = this.posYfin
            return false
        }
    }
}