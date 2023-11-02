class PiezaTablero extends Pieza{
    
    constructor(ctx, x, y, w, h, img) {
        super(ctx,x,y,w,h)
        this.img = img;
    }

    draw( color){
        this.ctx.fillStyle=this.img;
        this.ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}