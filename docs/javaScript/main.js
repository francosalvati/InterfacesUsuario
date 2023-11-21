//CODIGO PARA 4 en linea

document.getElementById("btn-play").addEventListener("click", function () {

    // Oculta el formulario
    document.getElementById("miFormulario").style.display = "none";

    // Muestra el contenido adicional
    document.getElementById("turn").style.display = "block";

    document.getElementById("canvas").style.display = "block";
    document.getElementById("instruction").style.display = "flex";
    document.getElementById("img-share").style.display = "block";
    document.getElementById("container-comidas").style.marginBottom = "8px";

});

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

turn = document.getElementById('turn');

const tipoJuego = document.getElementById('opciones');
const play = document.getElementById('btn-play');
const formulario = document.getElementById('miFormulario');
const playAgainButton = document.getElementById("play-again");

const imgComida1Select = document.getElementById('img-comida1');
const imgComida2Select = document.getElementById('img-comida2');
const selectComida1 = document.getElementById('comida1');
const selectComida2 = document.getElementById('comida2');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let players = [];
let figures = [];
let disksA = [];
let disksB = [];

//creo mi Game, board,players y diks tomando lo que me pase el user desde el DOM
let board = new Board(6, 7, 90, 485, 50);//tablero por default
let CANT_FIG = board.getSize();
let player1 = new Player("azul", disksA);
let player2 = new Player("rojo", disksB);
players.push(player1, player2);

let game = new Game(players, board, figures, 4);

let lastClickedFigure = null;
let isMouseDown = false;

function createGame() {//crea el juego dependiendo de los parametros elegidos por el usuario
    let cellSize = 70;
    let valor = tipoJuego.value;
    let rows = parseInt(valor) + 2;
    let cols = parseInt(valor) + 3;
    let boardWidth = cols * cellSize;
    let boardHeight = rows * cellSize;
    let startX = (canvasWidth - boardWidth) / 2;
    let startY = 0;
    board = new Board(rows, cols, cellSize, startX, startY);
    game = new Game(players, board, figures, parseInt(valor));
    addFigures();
    board.draw(ctx);
    CANT_FIG = board.getSize();
    game.startTimer();
    //update();
}
selectComida1.addEventListener('change', function () {//se fija que comida eligio el usuario
    var selectedComida = document.getElementById('comida1').value;
    var imagePath = 'images/4enlinea/' + selectedComida + '.png';
    imgComida1Select.src = imagePath;
});

selectComida2.addEventListener('change', function () {//se fija que comida eligio el usuario
    var selectedComida2 = document.getElementById('comida2').value;
    var imagePath = 'images/4enlinea/' + selectedComida2 + '.png';
    imgComida2Select.src = imagePath;
});

formulario.addEventListener('submit', function (event) {//asigno los comidas que eligio el jugador
    event.preventDefault();

    comida1 = document.getElementById('comida1').value;
    comida2 = document.getElementById('comida2').value;

    player1.setName(comida1);
    player2.setName(comida2);

    imgComida1 = new Image();
    imgComida2 = new Image();

    createGame();
});

let currentColor = 'blue';
function addFigure() {//agrego las figuras de los 2 equipos
    if (currentColor === 'blue') {
        addCircle('blue');
        currentColor = 'red';
    } else {
        addCircle('red');
        currentColor = 'blue';
    }
    update();
}

function update(c) {//actualizo el canvas
    // Limpia el canvas
    clearCanvas();
    board.draw(ctx, c);
    let player = game.getCurrentPlayer();
    turn.textContent = 'Es el turno de:    ' + player.getName();

    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

function getRandomNumber(min, max) {//genera un numero random
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function addCircle(team) {//agrego el circle dependiendo el equipo
    let circleRadius = 30;
    let posX, posY;
    let boardYmax = canvasHeight - board.getStartY() - circleRadius - 50;
    let boardYmin = canvasHeight - board.getHeight() + board.getStartY() + 10;
    let numRandom = getRandomNumber(boardYmax, boardYmin);
    if (team === 'blue') {
        var comida = comida1;
        posX = Math.round(Math.random() * (board.getStartX() - circleRadius - circleRadius) + circleRadius - 5);//que aparezca en los containers
        posY = canvasHeight - circleRadius - numRandom;
        let circle = new Circle(posX, posY, circleRadius, team, ctx, comida1);
        disksA.push(circle);
    } else if (team === 'red') {
        var comida = comida2;
        const maxX = (canvasWidth - circleRadius) - board.getStartX() - board.getWidth() - circleRadius;
        posX = Math.round(Math.random() * maxX + board.getStartX() + board.getWidth() + circleRadius + 5);//que aparezca en los containers
        posY = canvasHeight - circleRadius - numRandom;
        let circle = new Circle(posX, posY, circleRadius, team, ctx, comida2);
        disksB.push(circle);
    }

    let circle = new Circle(posX, posY, circleRadius, team, ctx, comida);
    figures.push(circle);
}

function onMouseDown(e) {//si hay una figura en el mouse la selecciona
    isMouseDown = true;

    if (lastClickedFigure != null && !lastClickedFigure.getMovido()) {
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }
    let player = game.getCurrentPlayer();
    let clickFig = findClickedFigure(e.offsetX, e.offsetY);
    if (clickFig != null && player.disksContains(clickFig)) {
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
    update();
}

function onMouseUp(e) {//si hay una ficha en una columna y la suelta la dropea ahi
    isMouseDown = false;
    disk = lastClickedFigure;
    if (disk != null) {
        var col = board.getCol(disk);
    }


    if (disk != null && col != null) {//si hay un disk seleccionado y una columna lo dropeo
        if (!board.isColumnFull(col)) {
            let player = game.getCurrentPlayer();
            player.dropDisk(col, disk, board, game);
            game.winGame();
        } else {//si la columna esta llena lo devuelvo a la pos original
            disk.posOriginal();
        }
    } if (disk != null && col === null) {//si no lo dropea en nunguna columna lo devuelvo a la pos original
        disk.posOriginal();
    }
    update();

}

function onMouseMove(e) {//si hay una figura la va moviendo
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.offsetX, e.offsetY);
        let col = board.getCol(lastClickedFigure);
        update(col);//si hay una figura en una columna, resalta esa columna
    }
}

function clearCanvas() {//borra el canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}


function addFigures() {//agrega las figuras dependiendo de la cantidad que son
    addFigure();
    if (figures.length < CANT_FIG) {
        setTimeout(addFigures, 33);
    }
}

playAgainButton.addEventListener('click', function () {//el boton para jugar de vuelta
    resetGame();
    document.getElementById("canvas").style.display = "none";
    document.getElementById("turn").style.display = "none";
    document.getElementById("winner").style.display = "none";
    document.getElementById("timer").style.display = "none";
});


function resetGame() {//restablece los valores iniciales del juego
    players = [];
    figures = [];
    disksA = [];
    disksB = [];

    board = new Board(6, 7, 90, 485, 50); //tablero por defecto
    CANT_FIG = board.getSize();
    board.draw(ctx);

    player1 = new Player("azul", disksA);
    player2 = new Player("rojo", disksB);
    players.push(player1, player2);

    game = new Game(players, board, figures, 4);

    lastClickedFigure = null;
    isMouseDown = false;
    currentColor = 'blue';

    //limpia el canvas
    clearCanvas();
    update();

    //oculta el botón "Jugar de Nuevo"
    playAgainButton.style.display = "none";
    document.getElementById("turn").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("miFormulario").style.display = "block";


}

playAgainButton.addEventListener('click', resetGame);

function showWinner(empate) {//muestra el ganador o un empate
    let player = game.getCurrentPlayer().getName();
    let winner = document.getElementById("winner");
    if (empate === true) {
        winner.innerHTML = "EMPATE";
    } else {
        winner.innerHTML = "Ganó: " + player;
    }
    playAgainButton.style.display = "block";
    document.getElementById("winner").style.display = "block";
    document.getElementById("timer").style.display = "none";
    document.getElementById("turn").style.display = "none";
    document.getElementById("container-comidas").style.marginBottom = "75px";

}

function findClickedFigure(x, y) {//se fija si hay una figura en el mouse
    for (let i = 0; i < figures.length; i++) {
        const element = figures[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);