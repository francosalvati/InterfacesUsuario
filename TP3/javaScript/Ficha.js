class Ficha extends Pieza {
    constructor(id, ctx, x, y, w, h, jugador, imagenSrc) {
        super(ctx, x, y, w, h);
        this.radio = w / 1.5;
        this.jugador = jugador;
        this.imagen = new Image();
        this.imagen.src = imagenSrc;
        this.imagenCargada = false; // Asegurarse de que la imagen esté cargada antes de dibujarla
        this.imagen.onload = () => {
            this.imagenCargada = true;
            // Llamar a una función para dibujar la imagen después de que se haya cargado
            this.draw();
        };
        this.posXfin = x;
        this.posYfin = y;
        this.id = id;
        this.transferible = true;
        this.imagenEscala = 1.4; // Escala inicial de la imagen
    }

    setColor(color) {
        this.color = color
    }

    draw() {
        if (this.imagenCargada) {
            const imagenAncho = this.w * this.imagenEscala;
            const imagenAlto = this.h * this.imagenEscala;
            this.ctx.drawImage(this.imagen, this.x - imagenAncho / 2, this.y - imagenAlto / 2, imagenAncho, imagenAlto);
        }
    }

    setImagenEscala(escala) {
        this.imagenEscala = escala;
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