class Tablero extends Pieza {
    constructor(ctx, x, y, w, h, tamanioX, tamanioY, img) {
        super(ctx, x, y, w, h)
        this.turno = '';
        this.tamanioX = tamanioX
        this.tamanioY = tamanioY
        this.tablero = []
        this.img = img
        this.cantidadFichas = (tamanioX * tamanioY)
        this.fichas = []
        this.turno = null
        this.cajaDeJuego = []
    }

    createTablero(){
        if(this.tablero){
            for(let i = 0; i<this.tamanioX; i++){
                let fila = []
                for(let j = 0; j<this.tamanioY; j++){
                    if(Math.random() < 0.5){
                        fila.push(new PiezaTablero(this.ctx, this.x + i * this.w, this.y + j * this.h , this.w, this.h, "red"))
                    }else{
                        fila.push(new PiezaTablero(this.ctx, this.x + i * this.w, this.y + j * this.h , this.w, this.h, "blue"))
                    }
                }
                this.tablero.push(fila)
                }
                this.setCajadeJuego()
            }
    }

        setCajadeJuego(){
            for(let i = 0 ; i < this.tamanioX; i++){
            this.cajaDeJuego.push(new CajadeJuego(this.ctx, this.x + i * this.w, this.y - this.h - 10, this.h , this.w))
            }
        }

        drawCajadeJuego(){
            for (const caja of this.cajaDeJuego) {
                caja.draw()
            }
        }

    crearFichas(){
        for(let i = 0; i < this.cantidadFichas; i++){
            this.fichas.length % 2 != 0 ?
            this.fichas.push(new Ficha(this.ctx, 100 + i * 7, 550, 40, 40, 1)) :
            this.fichas.push(new Ficha(this.ctx, 500 + i * 7, 550 , 40, 40, 2))
        }
        this.dibujarFichas()
    }

    dibujarFichas(){
        for (const ficha of this.fichas) {
            ficha.setColor('green')
            ficha.draw()
        }
    }

    buscarFicha(posX, posY){
        let i = this.fichas.length -1 
        while(i >= 0 ){
            if(this.fichas[i].ClickOn(posX, posY) != null){
                let ficha = this.fichas[i].ClickOn(posX, posY)
                i = -1
                ficha.draw('red')
                if(ficha.soltarFicha()){

                }
                return ficha
            }
            i--
        }
        return null
    }

    checkCaja(posX, posY){
        for (const caja of this.cajaDeJuego) {
            if(caja.checkCaja(posX, posY)){
                
            }
        }
        
    }

    draw(){
        for(let i = 0; i<this.tamanioX; i++){
            for(let j = 0; j<this.tamanioY; j++){
                this.tablero[i][j].draw()
            }
            }
        }
    }

