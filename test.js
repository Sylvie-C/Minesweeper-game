const Game = require('./game.js') ;
const Board = require('./board.js') ;

let board = new Board(5,5,3) ;
let play = new Game(5,5,3) ;

let gameBoard = board.playerBoard ;
board.print(gameBoard) ;

play.playMove(0,0) ;
play.playMove(3,4) ;
