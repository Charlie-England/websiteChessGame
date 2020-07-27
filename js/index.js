let gameState = { //was positions
    0:["blk-rook","player2"],
    1:["blk-knight","player2"],
    2:["blk-bishop","player2"],
    3:["blk-queen","player2"],
    4:["blk-king","player2"],
    5:["blk-bishop","player2"],
    6:["blk-knight","player2"],
    7:["blk-rook","player2"],
    8:["blk-pawn","player2"],
    9:["blk-pawn","player2"],
    10:["blk-pawn","player2"],
    11:["blk-pawn","player2"],
    12:["blk-pawn","player2"],
    13:["blk-pawn","player2"],
    14:["blk-pawn","player2"],
    15:["blk-pawn","player2"],
    16:[false,"none"],
    17:[false,"none"],
    18:[false,"none"],
    19:[false,"none"],
    20:[false,"none"],
    21:[false,"none"],
    22:[false,"none"],
    23:[false,"none"],
    24:[false,"none"],
    25:[false,"none"],
    26:[false,"none"],
    27:[false,"none"],
    28:[false,"none"],
    29:[false,"none"],
    30:[false,"none"],
    31:[false,"none"],
    32:[false,"none"],
    33:[false,"none"],
    34:[false,"none"],
    35:[false,"none"],
    36:[false,"none"],
    37:[false,"none"],
    38:[false,"none"],
    39:[false,"none"],
    40:[false,"none"],
    41:[false,"none"],
    42:[false,"none"],
    43:[false,"none"],
    44:[false,"none"],
    45:[false,"none"],
    46:[false,"none"],
    47:[false,"none"],
    48:["white-pawn","player1"],
    49:["white-pawn","player1"],
    50:["white-pawn","player1"],
    51:["white-pawn","player1"],
    52:["white-pawn","player1"],
    53:["white-pawn","player1"],
    54:["white-pawn","player1"],
    55:["white-pawn","player1"],
    56:["white-rook","player1"],
    57:["white-knight","player1"],
    58:["white-bishop","player1"],
    59:["white-queen","player1"],
    60:["white-king","player1"],
    61:["white-bishop","player1"],
    62:["white-knight","player1"],
    63:["white-rook","player1"],
}

let initialPositions = {
    "blk-pawn":[8,9,10,11,12,13,14,15],
    "blk-rook":[0,7],
    "blk-knight":[1,6],
    "blk-bishop":[2,5],
    "blk-queen":[3],
    "blk-king":[4],
    "white-pawn": [48,49,50,51,52,53,54,55],
    "white-rook": [56,63],
    "white-knight": [57,62],
    "white-bishop": [58,61],
    "white-queen": [59],
    "white-king": [60]
}



let piecesFunctionDict = {
    "white-pawn": pawn,
    "white-rook": rook,
    "white-knight": knight,
    "white-bishop": bishop,
    "white-queen": queen,
    "white-king": king,
    "blk-pawn": pawn,
    "blk-rook": rook,
    "blk-knight": knight,
    "blk-bishop": bishop,
    "blk-queen": queen,
    "blk-king": king
}

let currentPlayer = "player1";
let selectedItem = false;

/*   
General functions work by applying class types to the buttons
When a button is selected that has a background image, it will also

*/

/***********************Start up functions */
function initialGameStartup() {
    //This function will iterate through all .btn-grid-space elements
    //It will add a position class to each (used for checking the status using the gameState object)
    //It will color the grid to be offset coloring by adding in a class
    //On ceach button it will attach an event listener
        //An anonymous function will be created that sends the position (i) to handleClick();
    let offset=0;
    for (let i = 0; i < document.querySelectorAll(".btn-grid-space").length; i++) {
        //create the position class and add this to the button
        let positionClass = `pos-${i}`;
        document.querySelectorAll(".btn-grid-space")[i].classList.add(positionClass);

        //Offset modifer, used to add to the i to get a checkerboard color
        if (i % 8 == 0 && i > 7) {
            if (offset == 0) {
                offset = 1;
            } else {
                offset = 0;
            }
        }
        
        if ((i+offset) % 2 == 0) {
            document.querySelectorAll(".btn-grid-space")[i].classList.add("blk-grid-spot");
        }

        if (i <= 15 || i >= 48) {
            let classImage = gameState[i][0];
            document.querySelectorAll(".btn-grid-space")[i].classList.add(classImage);
            document.querySelectorAll(".btn-grid-space")[i].addEventListener("click", function() {
                handleClick(i);
            }) 
            } else {
                document.querySelectorAll(".btn-grid-space")[i].addEventListener("click", function() {
                    handleClick(i);
            })
        }
        
    }
}


/**********************Button click functions and logic */

function handleClick(position) {
    //This function handles the clicks from each button on the grid
    //Each button will call this function when clicked and send in its position
    //this position can be used as a key on the GameState board

    if (selectedItem) {
        let movePosition = position;

        //using the selectedItem as a key, find the piece
        //use this piece to reference the piecesFunctionDict can call function
        let pieceSelected = gameState[selectedItem][0];
        piecesFunctionDict[pieceSelected](selectedItem, movePosition);
        
        //run as function
        // piecesFunctionDict[selectedItem.piece](color, selectedItem, pieceAndPosition);

        //clear clicked item
        //clear button selected on page
    } else if (gameState[position][0] && gameState[position][1] == currentPlayer) {
        selectedItem = position;
        showActivePiece();
    } else {
        resetSelection(position);
    }
}

function showActivePiece() {
    //checks activePlayer and sets the image of the player info box to that image
    document.querySelector(`.${currentPlayer}-selected-piece`).style.backgroundImage = `url('pieces/${gameState[selectedItem][0]}.png')`;
}


/*************************Pieces Logic***************** */


function pawn(selectedItem, movePosition) {
    let moveModifier = 0;
    let pawnMoves = {
        "start-pos": [8,16],
        "unoccupied": [8],
        "occupied": [7,9]
    }

    //Receives selectedItem (int reference for piece selected in gameState)
    //Receives movePosition (int reference for movement position in gameState)
    if (currentPlayer=="player1") {
        moveModifier = -1;
    } else if (currentPlayer=="player2") {
        moveModifier = 1;
    }

    let moveDifference = (movePosition - selectedItem)*moveModifier; // basically gets the absolute value of the move

    console.log(`${gameState[selectedItem][0]} at ${selectedItem} trying to move to ${movePosition} which has a piece ? ${gameState[movePosition][0]}`);

    //check if space is unoccupied (aka pawn can move +/- 7 and +/-9 only if place is occupied by an opposing piece)
    if (gameState[movePosition][0] && gameState[movePosition][1] != currentPlayer) { //Move position is occupied
        if (pawnMoves["occupied"].includes(moveDifference)) {
            movePieceInCss(selectedItem, movePosition); //Call function to add image Class and update gameboard

            console.log("successful move")
        } else {
            console.log("unsuccessful move")
        }
    } else if (gameState[movePosition][1] == currentPlayer) { //If position selected is current player, set selectedItem to move position
        selectedItem = movePosition;
        console.log("reassigned selected Item")
        return "";
    } else { //space is unoccupied
        console.log("move to unoccupied space")
        
        if (initialPositions[gameState[selectedItem][0]].includes(selectedItem)) { //Check to see if in starting position
            console.log("in start position")
            console.log(moveDifference)
            if (pawnMoves["start-pos"].includes(moveDifference)) {
                //
                console.log(selectedItem+(8*moveModifier));
                if (gameState[selectedItem+(8*moveModifier)][0]) { //if trying to move 2 spaces and the 1st is blocked, return null else go ahead and move
                    resetSelection();
                    return ""
                } else {
                    movePieceInCss(selectedItem, movePosition); //Call function to add image Class and update gameboard
                }
            }
        } else if (pawnMoves["unoccupied"].includes(moveDifference)){
            movePieceInCss(selectedItem, movePosition); //Call function to add image Class and update gameboard
        } else {
            console.log("unsuccessful move");
        }
    }
}



function rook(selectedItem, movePosition) {
    console.log(`${gameState[selectedItem][0]} at ${selectedItem} trying to move to ${movePosition} which has a piece ? ${gameState[movePosition][0]}`);

}

function knight(color) {
    console.log(`knight: ${color} called`)
}

function bishop(color) {
    console.log(`bishop: ${color} called`)
}

function queen(color) {
    console.log(`queen: ${color} called`)
}

function king(color) {
    console.log(`king: ${color} called`)
}

function checkInitialPosition(selectedPiece, selectedPosition) {
    //checks the selected piece location with the initial position
    //gets a selected piece and a selected position and cross checks this
    //with the initial positions, returns true of in initial position
    let selectedPositionInt = parseInt(selectedPosition)
    if (initialPositions[selectedPiece].includes(selectedPositionInt)) {
        return true;
    } else {
        return false;
    }
}

function resetSelection() {
    //Called due to the incorrect location/move being chosen
    //resets the selected piece and should remove all highlighted buttons
    document.querySelector(".player2-selected-piece").style.backgroundImage = "";
    document.querySelector(".player1-selected-piece").style.backgroundImage = "";
    selectedItem = false;
}

function movePieceInGameState(selectedItem, movePosition) {
    gameState[movePosition] = gameState[selectedItem];
    console.log(gameState[movePosition])
    gameState[selectedItem] = [false, "none"];
    console.log(gameState[selectedItem])
    switchPlayers();
    resetSelection();
}

function movePieceInCss(selectedItem, movePosition) {
    //add background image to selectedPosition
    let imageClass = gameState[selectedItem][0]
    if (gameState[movePosition][0]) { //if the move position has a piece in it
        let pieceTakenClass = gameState[movePosition][0]
        document.querySelector(`.pos-${movePosition}`).classList.remove(`${pieceTakenClass}`);
    }
    
    document.querySelector(`.pos-${movePosition}`).classList.add(`${imageClass}`);
    document.querySelector(`.pos-${selectedItem}`).classList.remove(`${imageClass}`);

    movePieceInGameState(selectedItem, movePosition);

}

function switchPlayers() {
    if (currentPlayer=="player1") {
        currentPlayer = "player2";
        document.querySelector(".player2-h1").classList.add("active-player");
        document.querySelector(".player1-h1").classList.remove("active-player");
    } else {
        currentPlayer = "player1";
        document.querySelector(".player1-h1").classList.add("active-player");
        document.querySelector(".player2-h1").classList.remove("active-player");
    }
}

/**************Start Up Calls******************************** */

initialGameStartup();
