class Ficha extends Pieza{
    
    constructor(ctx, x, y, w, h) {
        super(ctx,x,y,w,h)
        this.radio = w / 2 
    }

    draw(ctx, x, y, color){
        ctx.context.fillStyle= color
        ctx.context.beginPath()
        ctx.arc(x, y, radio, 0, Math.PI * 2)
        ctx.fill()
        ctx.context.closePath()
        
    }

    ClickOn(posX, posY){
        let dist =  Math.sqrt(Math.pow(posX - x, 2) + Math.pow(posY - y, 2))
        if(dist <= this.radio){
            
        }
    }
}