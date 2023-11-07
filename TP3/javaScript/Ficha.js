class Ficha extends Pieza {
    constructor(id, ctx, x, y, w, h, jugador, imagenSrc) {
        super(ctx, x, y, w, h);
        this.radio = w / 1.5;
        this.jugador = jugador;
        this.img = this.getImg(imagenSrc)
        this.imgLoaded = false;
        this.posXfin = x;
        this.posYfin = y;
        this.id = id;
        this.transferible = true;
    }

    getImg(imagenSrc) {
        let image = new Image();
        image.src = imagenSrc;
        image.onload = () => {
            // Marcar la imagen como cargada cuando se complete la carga
            this.imgLoaded = true;
        };
        return image;
    }


    setColor(color) {
        this.color = color
    }

    draw() {
            // Si la imagen ya está cargada, dibújala directamente
            if(this.imgLoaded ){
                this.ctx.drawImage(this.img, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
            }
    }

    getJugador() {
        return this.jugador
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getTransferible() {
        return this.transferible
    }

    getFicha(posX, posY, jugador) {
        let dist = Math.sqrt(Math.pow(posX - this.x, 2) + Math.pow(posY - this.y, 2))
        if (dist <= this.radio && this.jugador == jugador) {
            return this
        }
        return null
    }

    arrastrarPos(posX, posY) {
        this.x = posX
        this.y = posY

    }

    aumentarPosY() {
        this.y += 10
    }

    setY(posY) {
        this.y = posY
        this.posYfin = this.y
    }

    soltarFicha(pos) {
        if (!pos.length < 1) {
            this.x = pos[0]
            this.y = pos[1]
            this.posXfin = this.x
            this.posYfin = this.y
            this.transferible = false
            return true
        }
        else {
            this.x = this.posXfin
            this.y = this.posYfin
            return false
        }
    }
}