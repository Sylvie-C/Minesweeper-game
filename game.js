const Board = require('./board.js') ;

class Game {
/* 	Class to handle game results, based on class Board. The constructor is then created from the Board class’ one.
	Constructor : constructor ( numberOfRows , numberOfColumns , numberOfBombs )
	Methods : playMove( rowIndex , columnIndex ).
*/

	constructor ( numberOfRows , numberOfColumns , numberOfBombs) {
		this._board = new Board ( numberOfRows , numberOfColumns , numberOfBombs ) ;
	} // End of Game Constructor

    // METHODS

	playMove(rowIndex,columnIndex) {
	/* 	Method that flips a tile on the board, corresponding to rowIndex and columnIndex passed as arguments.
		Prints the result of the game and the updated board.
		Return : none.
	*/
		this._board . flipTile ( rowIndex , columnIndex ) ;

		if (this._board._playerBoard[rowIndex][columnIndex] === 'B' ) {
		// if the flipped tile has a bomb, the game is over
			console.log('What a shame ! You loose. The game is over. :-(') ;
			this._board.print(this._board._bombBoard) ;

		} else if (!this._board.hasSafeTiles()) {
		// else if no more unflipped safe tiles left
			console.log('Awesome ! You win ! Congratulations !') ;
			this._board.print(this._board._playerBoard);

		} else {
		// else the player should be allowed to continue playing
			console.log('Current board : \n') ;
			this._board.print(this._board._playerBoard) ;
		}
	} // End of playMove method
} ; // End of class Game

module.exports = Game ;
