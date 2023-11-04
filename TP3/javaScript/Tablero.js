class Tablero extends Pieza {
    constructor(ctx, x, y, w, h, tamanioX, tamanioY) {
        super(ctx, x, y, w, h)
        this.turno = '';
        this.tamanioX = tamanioX
        this.tamanioY = tamanioY
        this.tablero = []
        this.cantidadFichas = (tamanioX * tamanioY)
        this.fichas = []
        this.turno = 1
        this.cajaDeJuego = []
        this.images = ['../imagenes/Logo.png']
    }

    createTablero() {
        if (this.tablero) {
            for (let i = 0; i < this.tamanioX; i++) {
                let fila = []
                for (let j = 0; j < this.tamanioY; j++) {
                    if (Math.random() < 0.5) {
                        fila.push(new PiezaTablero(this.ctx, this.x + i * this.w, this.y + j * this.h, this.w, this.h, this.images))
                    } else {
                        fila.push(new PiezaTablero(this.ctx, this.x + i * this.w, this.y + j * this.h, this.w, this.h, this.images))
                    }
                }
                this.tablero.push(fila)
            }
            this.setCajadeJuego()
        }
    }

    setCajadeJuego() {
        for (let i = 0; i < this.tamanioX; i++) {
            this.cajaDeJuego.push(new CajadeJuego(this.ctx, this.x + i * this.w, this.y - this.h - 10, this.h, this.w))
        }
    }

    drawCajadeJuego() {
        for (const caja of this.cajaDeJuego) {
            caja.draw()
        }
    }

    crearFichas() {
        for (let i = 0; i < this.cantidadFichas; i++) {
            this.fichas.length % 2 != 0 ?
                this.fichas.push(new Ficha(this.ctx, 100 + i * 7, 550, 40, 40, 1)) :
                this.fichas.push(new Ficha(this.ctx, 500 + i * 7, 550, 40, 40, 2))
        }
        this.dibujarFichas()
    }

    dibujarFichas() {
        for (const ficha of this.fichas) {
            ficha.setColor('green')
            ficha.draw()
        }
    }

    buscarFicha(posX, posY) {
        let i = this.fichas.length - 1
        while (i >= 0) {
            if (this.fichas[i].getFicha(posX, posY, this.turno) != null) {
                let ficha = this.fichas[i].getFicha(posX, posY, this.turno)
                i = -1
                ficha.draw('red')
                return ficha;
            }
            i--
        }
        return null
    }

    checkCaja(ficha) {
        let i = 0, pos = []
        while (i < this.cajaDeJuego.length) {
            pos = this.cajaDeJuego[i].checkCaja(ficha.getX(), ficha.getY())
            if (!pos.length < 1) {
                return pos
            }
            i++;
        }
        return pos
    }

    setTurno() {
        this.turno === 1 ? this.turno = 2 : this.turno = 1
    }

    draw() {
        for (let i = 0; i < this.tamanioX; i++) {
            for (let j = 0; j < this.tamanioY; j++) {
                this.tablero[i][j].draw()
            }
        }
    }


    checkWin(ficha, caja) {
        let j = this.tamanioY - 1
        while (j > 0) {
            if (this.tablero[caja][j].getFicha()) {
                this.tablero[caja][j].setFicha(ficha)
                j = 0
            }
            j--
        }


    }
}

