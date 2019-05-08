
class Board {
  constructor(numberOfColumns,numberOfBombs) {
    this._numberOfColumns = numberOfColumns ;
    this._numberOfRows = numberOfColumns ; // square of tiles fixed board.
    this._numberOfBombs = numberOfBombs ;
    this._numberOfTiles = this._numberOfRows * numberOfColumns ;
    this._bombsBoard = this.generateBombsBoard() ;
  }

  // Accessors :

  get bombsGet() {
    return this._bombsBoard ;
  }

  // Methods :

  generatePlayerBoard(tagId) {
    /* Method to display player's board of clickable buttons, that enable a
       display of a result.

       Passed parameters : none.
       Return : Array of playerBoard's html code chain for empty images clickable buttons.
   */
    let i = 1 ;
    let chain = "" ;
    let playerBoardArr = [] ;

    /* Chain production : <button class = "1" onclick = ...</button>
      <button class = "2" ...  "3" ...
    */
    while (i <= this._numberOfTiles) {
      chain = " <button id='" + i + " ' onclick='play(this.id)'><img src='images/empty.png' /></button> " ;
      playerBoardArr.push(chain) ;
      i++ ;
    }
    return playerBoardArr ;
  }

  generateBombsBoard() {
    /* Method to generate the board "solution" with bombs on it.
       Passed parameters : none.
       Return : array with 1st element = array of images html code chains,
                           2nd element = array of bombs index in 1st element array.
    */
    let randomNum = 0 ;
    let imgId = 0 ;
    let bombChain = "" ;
    let bombsChainArray = [] ; // storage of empty and bombs html code images
    let bombsIndexArr = [] ; // storage of bombs index in bombsChainArray
    let bombsCounter = 0 ;

    // Create array of html code for empty images
    for (let i=1 ; i <= this._numberOfTiles ; i++) {
      bombsChainArray.push("<img id='" + i + "' src='images/empty.png' />") ;
    } // image id 1 in array index 0 , image id 2 in array index 1 , etc ...

    while (bombsCounter < this._numberOfBombs) {
      // pick up random number in [ 0 - number of tiles [ -> excluded !
      randomNum = Math.floor ( Math.random() * this._numberOfTiles ) ;

      imgId = randomNum + 1 ;

      if ( ! bombsChainArray[randomNum].includes("bomb")) {
      // if not already a bomb placed at this index

        bombsChainArray[randomNum] = "<img id='" + imgId + "' src='images/bomb.png' />" ;
        // place a bomb image html code at randomNum index

        bombsIndexArr.push(randomNum) ; // store bomb index in bombsChainArray

        bombsCounter ++ ;
      }
    }
    return [bombsChainArray , bombsIndexArr] ; // Return of an array of 2 arrays
  } // End of generateBombBoard()

} ;  // End of class Board


class Game {
  constructor (numberOfColumns,numberOfBombs) {
    this._boardObj = new Board (numberOfColumns,numberOfBombs) ;
    this._playerBoard = this._boardObj.generatePlayerBoard() ;
    this._bombsBoard = this._boardObj.bombsGet ;
    this._clickCounter = 0 ;
  }

  printPlayerboard(tagId) {
    document.getElementById(tagId).innerHTML = this._playerBoard.join(" ") ;
  }

  playMove(clickId) {
    /* Method that catches id of button clicked by player,
      then displays number of surrounding bombs around this clicked tile/button.

      Passed parameters : clicked button id.
      Return : none.
    */
    clickId = Number(clickId) ; // Warning : buttons Id start at 1, array index at 0.

    if ( this._bombsBoard[1].includes(clickId-1) ) {

      // if the clicked tile contains a bomb -> player looses.
      document.getElementById("result").innerHTML = "What a shame ! You loose. Hope you enjoyed, bye !" ;
      document.getElementById("gameFrame").innerHTML = this._bombsBoard[0].join(" ") ;
      setTimeout(function() {window.location="../../games.html" ; } , 7000) ;
    }else{
      // else, count number of surrounding bombs and display it in clicked tile

      const bombsNumber = this.bombsCounter(clickId-1) ;

      this._playerBoard[clickId-1] = "<img id='" + clickId + "' src='images/" + bombsNumber + ".png' />" ;
      document.getElementById("gameFrame").innerHTML = this._playerBoard.join(" ") ;

      this._clickCounter ++ ;

      if (this._clickCounter === 20) {
        document.getElementById("result").innerHTML = "Bravo, you win ! Hope you enjoyed, bye !" ;
        setTimeout(function() {window.location="../../games.html" ; } , 7000) ;
      }
    }
  }

  bombsCounter(index) {
    /*  Method to count surrounding bombs around  button/tile clicked by player.
        Warning : Based on a fixed size board of 5 columns !!!

        Passed parameters : index of clicked button in array (not image id).
        Return : number of surrounding bombs.
    */

    let counter = 0 ;

    const centerOffsets = [ -6 , -5 , -4 , -1 , 1 , 4 , 5 , 6 ] ;
    const leftOffsets = [ -5 , -4 , 1 , 5 , 6 ] ;
    const rightOffsets = [ -6 , -5 , -1 , 4 , 5 ] ;

    let surroundingIndexArr = [] ;
    let x = 0 ;

    // if clicked button is on the left middle side of the board :
    if (index % 5 === 0) {

      // make appropriate array of surrounding index around clicked tile/button
      surroundingIndexArr = leftOffsets.map ( tileOffset => {
        return index+tileOffset ;
      } ) ;

      // count number of bombs in array
      surroundingIndexArr.forEach ( x => {
        if (x>=0 && x<25) {
          if (this._bombsBoard[1].includes(x)) { counter++ ; }
        }
      }
      ) ;

     // else if clicked button is on the right middle side of the board :
    }else if (index % 5 === 4) {

      // make appropriate array of surrounding tiles index
      surroundingIndexArr = rightOffsets.map ( tileOffset => {
        return index+tileOffset ;
      } ) ;

      // count number of bombs in array
      surroundingIndexArr.forEach ( x => {
        if (x>=0 && x<25) {
          if (this._bombsBoard[1].includes(x)) { counter++ ; }
        }
      } ) ;

    // else = if clicked button is in the center of the board :
    } else {

      // create appropriate array of surrounding tiles index
      surroundingIndexArr = centerOffsets.map ( tileOffset => {
        return index+tileOffset ;
      } ) ;

      // count number of bombs in array
      surroundingIndexArr.forEach ( x => {
        if (x>=0 && x<25) {
          if (this._bombsBoard[1].includes(x)) { counter++ ; }
        }
      }
      ) ;
    }
    return counter ;
  } // End of bombsCounter Method


  displayMessage() {

  }
} ; // End of class Game

let game = new Game(5,5) ;

function start() {
  // Player's board generated and displayed. Bombs board generated.
  game.printPlayerboard("gameFrame") ;
} ;

function play(tagId) {
  // play action after button clicked by player
  game.playMove(tagId) ;
}
