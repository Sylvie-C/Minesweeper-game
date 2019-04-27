const Game = require('./game.js') ;
const Board = require('./board.js') ;

let myBoard = new Board(5,5,3) ;
let play = new Game(5,5,3) ;

let gameBoard = myBoard.playerBoard ;
myBoard.print(gameBoard) ;

play.playMove(0,0) ;
play.playMove(3,4) ;
