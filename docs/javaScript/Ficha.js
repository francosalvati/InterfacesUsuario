class Ficha extends Pieza {
    
    constructor(id, ctx, x, y, w, h, jugador, imagenSrc, color) {
        super(ctx, x, y, w, h);
        this.radio = w / 2;
        this.jugador = jugador;
        this.img = new Image();
        this.imgLoaded = false;
        this.img.src = imagenSrc;
        this.posXfin = x;
        this.posYfin = y;
        this.id = id;
        this.transferible = true;
        this.color = color

        // Agregar un retraso minimo antes de cargar la imagen para que carguen correctamente
        setTimeout(() => {
            this.img.onload = () => {
                this.imgLoaded = true;
                this.draw(); // Llama a la función draw cuando la imagen esté cargada
            };
            this.img.src = imagenSrc; // Cargar la imagen después del retraso
        }, 100);
    }

    getImg(imagenSrc) {
        let image = new Image();
        image.src = imagenSrc;
        return image;
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI)
        this.ctx.strokeStyle = this.color == '#fff'? '#000' : "#fff";
        this.ctx.fillStyle = this.color
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath()
        if (this.imgLoaded) {
            let centerX = this.x - this.radio / 2
            let centerY = this.y - this.radio / 2
            console.log(centerX, centerY, this.x, this. y)
            this.ctx.drawImage(this.img, centerX, centerY, this.radio , this.radio );
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