class PiezaTablero extends Pieza {

    constructor(ctx, x, y, w, h) {
        super(ctx, x, y, w, h)
        this.img = this.getImg()
        this.ficha = null
    }

    getImg() {
        let image = new Image()
        image.src = '/TP3/imagenes/piezaTablero.png'
        return image
    }

    getFichaTablero(){
        return this.ficha
    }

    getY(){
        return this.y + this.h / 2
    }

    tieneFicha() {
        return this.ficha === null
    }
    setFicha(ficha) {
        this.ficha = ficha
    }

    draw() {
        const image = this.img;
        image.onload = () => {
            this.ctx.drawImage(image, this.x, this.y, this.w, this.h);
        };
        this.ctx.drawImage(image, this.x, this.y, this.w, this.h);
    }
}