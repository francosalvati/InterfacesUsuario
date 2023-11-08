class CajadeJuego extends Pieza{
    constructor(ctx, x, y, w, h) {
        super(ctx, x, y, w, h)
    }

    draw(){
        this.ctx.fillStyle = "rgba(185, 193, 40, 0.373)";
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    
    checkCaja(posX, posY){
        let ret = []
        if(this.x + this.w > posX && this.x < posX && this.y + this.h > posY && this.y < posY){
            ret = [this.x + this.w /2, this.y + this.h /2]
            return ret
        }
        else{
            return ret
        }
    }

}
