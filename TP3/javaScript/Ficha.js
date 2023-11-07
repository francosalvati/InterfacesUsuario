class Ficha extends Pieza {
    constructor(id, ctx, x, y, w, h, jugador, imagenSrc) {
        super(ctx, x, y, w, h);
        this.radio = w / 1.5;
        this.jugador = jugador;
        this.img = new Image();
        this.imgLoaded = false;
        this.img.src = imagenSrc;
        this.posXfin = x;
        this.posYfin = y;
        this.id = id;
        this.transferible = true;

        // Agregar un retraso minimo antes de cargar la imagen para que carguen correctamente
        setTimeout(() => {
            this.img.onload = () => {
                this.imgLoaded = true;
                this.draw(); // Llama a la función draw cuando la imagen esté cargada
            };
            this.img.src = imagenSrc; // Cargar la imagen después del retraso
        }, 10);
    }

    getImg(imagenSrc) {
        let image = new Image();
        image.src = imagenSrc;
        return image;
    }

    draw() {
        if (this.imgLoaded) {
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