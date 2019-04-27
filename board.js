class Board {
/* 	class to handle board results and display on player’s trials.
	Constructor : constructor (numberOfRows , numberOfColumns , numberOfBombs )
	Accessors : getter playerBoard( )
	Methods : 	generatePlayerBoard( ) , generateBombBoard( ) , print(board) , flipTile( rowIndex , columnIndex ) ,
					getNumberOfNeighbourBombs( ) , hasSafeTiles( ) .
*/
	constructor (numberOfRows,numberOfColumns,numberOfBombs) {
		this._numberOfRows = numberOfRows ;
		this._numberOfColumns = numberOfColumns ;
		this._numberOfBombs = numberOfBombs ;
		this._numberOfTiles = numberOfRows * numberOfColumns ; // flipTile( ) method
		this._playerBoard = this.generatePlayerBoard ( numberOfRows , numberOfColumns ) ;
		this._bombBoard = this.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs) ;
	}

// ACCESSORS
	get playerBoard() {
		return this._playerBoard ;
	}

// METHODS

generatePlayerBoard () {
/*	Method to dynamically generate the player board that displays the player’s result.
	Passed arguments : none.
	Return : board. Ex.: 3 col - 2 rows -> [ [ col1 , col2 , col3 ] , [ col1 , col2 , col3 ] ]
*/
	const board = [] ;
	for (let i=0 ; i < this._numberOfRows ; i++) {
		const row = [];       								// declaration/creation of a row
		for (let j=0 ; j < this._numberOfColumns ; j++) {
 				row.push(' ');    							// creates the cells inside the row, adding spaces in them
		}
		board.push(row);      							// pushes/adds the row into the board
	}
	return board ;
} // End of generatePlayerBoard function

generateBombBoard () {
/* 	Method to dynamically generate the bomb board that that stores the “solution” (bombs location).
	Passed arguments : none.
	Return : board.
*/
	const board = [] ;
	let numberOfBombsPlaced = 0 ;
	let randomRowIndex ;
	let randomColumnIndex ;

	for (let i=0 ; i < this._numberOfRows ; i++) {
		const row = [];   								// declaration of row arrays
		for (let j=0 ; j < this._numberOfColumns ; j++) {
			row.push(null); 								// creates the cells inside the row, adding “null” in them
		}
		board.push(row);
	}

	while (numberOfBombsPlaced < this._numberOfBombs) {
     	// fix bombs can be placed over already placed ones.
		randomRowIndex = Math.floor(Math.random() * Math.floor(this._numberOfRows)) ;
		randomColumnIndex = Math.floor (Math.random() * Math.floor(this._numberOfColumns)) ;

		if ( board [randomRowIndex] [randomColumnIndex] !== 'B' ) {
			board [randomRowIndex] [randomColumnIndex] = 'B' ;
				numberOfBombsPlaced++ ;
			}
	}
	return board ;
} // End of generateBombBoard method

print(board) {
/* 	Method to print boards.
	Passed parameter : board to print.
	Return : none.
*/
	console.log ( board.map ( row => row.join (' | ') ) . join ('\n') );
}

flipTile (rowIndex , columnIndex) {
/* 	Method to allow player to flip a tile on the player board.
	Passed arguments : rowIndex , columnIndex.
	Return : none.
*/
	// if the flipped tile has already been flipped (if it is not empty, meaning if it has the number of bombs around in it), just return it without any change in the player board
	if (this._playerBoard [rowIndex][columnIndex] !== ' ' ) {
		return ; }

	// if there is already a bomb on the player board flipped tile location, place a bomb over it
	else if ( this._bombBoard [rowIndex] [columnIndex] === 'B' ) {
		this._playerBoard [rowIndex] [columnIndex] = 'B' ;

	} else {
	// last possibility : if the flipped tile has not already been flipped and if it has not a bomb on it, display the number of surrounding bombs.
		this._playerBoard [rowIndex] [columnIndex] = this.getNumberOfNeighborBombs (rowIndex , columnIndex) ;
	}
	this._numberOfTiles -= 1  ; // decrement of number of tiles to treat
} // End of flipTile method


getNumberOfNeighborBombs (rowIndex , columnIndex) {
/* 	Method to check and count bombs around the flipped tile.
	Passed arguments : row index , column index of the flipped tile.
	Return : Number of surrounding bombs.
*/
	const neighborOffsets = [ [-1,-1] , [-1,0] , [-1,1] , [0,-1] , [0,1] , [1,-1] , [1,0] , [1,1] ] ;
	let numberOfSurroundingBombs = 0 ;

	neighborOffsets . forEach ( offset => {
															const neighborRowIndex = rowIndex + offset[0] ;
															const neighborColumnIndex = columnIndex + offset[1] ;

				// conditions to check tiles inside the board (index != -1 , …) :
				if ( 	neighborRowIndex >= 0 && neighborRowIndex < this._numberOfRows &&
							neighborColumnIndex >= 0 && neighborColumnIndex < this._numberOfColumns )
				{
					// If 'B' is in one of the surrounding tiles, increment number of bombs surrounding by 1
					if ( this._bombBoard [neighborRowIndex] [neighborColumnIndex] === 'B' ) {
  						numberOfSurroundingBombs++ ;
					}
				}
			}); // end of forEach method on neighborOffsets array
			return numberOfSurroundingBombs ;
} // End of getNumberOfNeighborBombs method


hasSafeTiles( ) {
/*	Method to check if "safe" tiles remain unflipped.
	unflipped tiles = _numberOfTiles, as _numberOfTiles is decremented in flipTile method, each time a tile is flipped.
	If the number of unflipped tiles = number of bombs, it means all the safe tiles have been flipped, and the player wins.
	Passed arguments : none.
	Return : “True” if number of flipped tiles is not = number of bombs.
*/
	return this._numberOfTiles !== this._numberOfBombs ;
	// truthy expression (not 0,null,undefined,NaN, '' or ""). return only if result is true.
} // End of hasSafeTiles method

} ; // End of class Board}

module.exports = Board ;
