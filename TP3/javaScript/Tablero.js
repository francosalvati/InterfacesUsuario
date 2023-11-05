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
        this.linea = 4
    }

    //Creacion y Dibujo

    crearTablero() {
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

    crearFichas() {
        for (let i = 0; i < this.cantidadFichas; i++) {
            this.fichas.length % 2 != 0 ?
                this.fichas.push(new Ficha(i, this.ctx, 100 + i * 7, 550, 40, 40, 1, '/TP3/imagenes/jhambur.png')) :
                this.fichas.push(new Ficha(i, this.ctx, 500 + i * 7, 550, 40, 40, 2, '/TP3/imagenes/jpizza.png'))
        }
        this.drawFichas()
    }


    drawFichas() {
        for (const ficha of this.fichas) {
            if (ficha.jugador == 1) {
                ficha.setColor('blue')
            } else {
                ficha.setColor('green')
            }
            ficha.draw()
        }
    }

    draw() {
        for (let i = 0; i < this.tamanioX; i++) {
            for (let j = 0; j < this.tamanioY; j++) {
                this.tablero[i][j].draw()
            }
        }
    }

    // LOGICA

    buscarFicha(posX, posY) {
        let i = this.fichas.length - 1
        while (i >= 0) {
            if (this.fichas[i].getFicha(posX, posY, this.turno) != null && this.fichas[i].getTransferible()) {
                let ficha = this.fichas[i].getFicha(posX, posY, this.turno)
                i = -1
                ficha.draw('red')
                return ficha;
            }
            i--
        }
        return null
    }


    setTurno() {
        this.turno === 1 ? this.turno = 2 : this.turno = 1
    }

    comparacionFicha(jugador, ficha) {
        return jugador === ficha.getJugador()
    }

    checkSoltar(ficha) {
        let i = 0, pos = []
        while (i < this.cajaDeJuego.length) {
            pos = this.cajaDeJuego[i].checkCaja(ficha.getX(), ficha.getY())
            if (!pos.length < 1) {
                this.RecorrerColumna(i, ficha);
                return pos
            }
            i++;
        }
        return pos
    }

    RecorrerColumna(index, ficha) {
        let j = this.tamanioY - 1
        while (j > 0) {
            if (this.tablero[index][j].tieneFicha()) {
                this.tablero[index][j].setFicha(ficha)
                this.animacionFicha(ficha, this.tablero[index][j].getY());
                this.checkGanador(index, j, ficha)
                j = 0
            }
            j--
        }

    }


    animacionFicha(ficha, posY) {
        const intervalId = setInterval(() => {
            ficha.aumentarPosY()
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.drawFichas()
            this.draw()
            if (ficha.getY() >= posY) {
                ficha.setY(posY)
                clearInterval(intervalId);
            }
        }, 1000 / 60);
    }

    // Caja de Lanzamiento

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

    hayGanador(jugador) {
        if (this.checkGanador(jugador)) {
            alert(`¡Jugador ${jugador} ha ganado!`);
            // Puedes realizar acciones adicionales aquí, como reiniciar el juego.
        }
    }

    checkGanador(jugador) {
        if (
            this.checkFilas(jugador) ||
            this.checkColumnas(jugador) ||
            this.checkDiagonales(jugador)
        ) {
            return true; // Devuelve true si el jugador ha ganado
        }
        return false; // Devuelve false si no hay ganador
    }

    handleMove(jugador) {
        this.hayGanador(jugador);
    }

    checkFilas(jugador) {
        for (let i = 0; i < this.tamanioX; i++) {
            for (let j = 0; j <= this.tamanioY - this.linea; j++) {
                let contador = 0;
                for (let k = 0; k < this.linea; k++) {
                    if (
                        this.tablero[i][j + k].getFichaTablero()?.getJugador() === jugador
                    ) {
                        contador++;
                    }
                }
                if (contador === this.linea) {
                    return true;
                }
            }
        }
        return false;
    }

    checkColumnas(jugador) {
        for (let j = 0; j < this.tamanioY; j++) {
            for (let i = 0; i <= this.tamanioX - this.linea; i++) {
                let contador = 0;
                for (let k = 0; k < this.linea; k++) {
                    if (
                        this.tablero[i + k][j].getFichaTablero()?.getJugador() === jugador
                    ) {
                        contador++;
                    }
                }
                if (contador === this.linea) {
                    return true;
                }
            }
        }
        return false;
    }

    checkDiagonales(jugador) {
        // Verificar diagonales descendentes
        for (let i = 0; i <= this.tamanioX - this.linea; i++) {
            for (let j = 0; j <= this.tamanioY - this.linea; j++) {
                let contador = 0;
                for (let k = 0; k < this.linea; k++) {
                    if (
                        this.tablero[i + k][j + k].getFichaTablero()?.getJugador() ===
                        jugador
                    ) {
                        contador++;
                    }
                }
                if (contador === this.linea) {
                    return true;
                }
            }
        }

        // Verificar diagonales ascendentes
        for (let i = 0; i <= this.tamanioX - this.linea; i++) {
            for (let j = this.linea - 1; j < this.tamanioY; j++) {
                let contador = 0;
                for (let k = 0; k < this.linea; k++) {
                    if (
                        this.tablero[i + k][j - k].getFichaTablero()?.getJugador() ===
                        jugador
                    ) {
                        contador++;
                    }
                }
                if (contador === this.linea) {
                    return true;
                }
            }
        }

        return false;
    }
}