let gameBoard = (function(){
    const rows = 3;
    const columns = 3;

    let board = [];

    //0, 1,2

    const winningCombinations = [
        //Horzontal win
        [[0, 0], [0, 1] [1, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        //vertical win
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1,], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],

        //Diagnol win
        [[0, 0], [1,1], [2,2]],
        [[0,2], [1, 1], [2,0]],
    ]


    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3 ; j++){
            board[i].push(null)
        }
    }

    let getBoard = () => board;

    let dropToken = (row, column, token) => {
       if(board[row][column] === null){
        board[row][column] = token;
        console.log('dropped')
        game.switchPlayer()
       }
       console.log('Occupied')
       return;
     }


    
    return { getBoard, dropToken, winningCombinations }
})();



function gameController(playerOne = 'Player One', playerTwo = 'Player Two'){
    let board = gameBoard.getBoard();

    const Players = [
        {
            name : playerOne,
            token : 'X'
        },

        {
            name : playerTwo,
            token : 'O',
        }
    ]

    let currentPlayer = Players[0];

    const switchPlayer = () => {
        currentPlayer = currentPlayer === Players[0] ? Players[1] : Players[0]
    }

    const getCurrentPlayer = () => currentPlayer;

    const checkWinner = (token) => {
        let allOccupied = true;
        
      
    }

    const PlayRound = (row, column) =>{
        gameBoard.dropToken(row, column, getCurrentPlayer().token
    
    
    );
    }

    


    return {
        getCurrentPlayer,
        switchPlayer,
        PlayRound,
       
    }
}


const game = gameController();


game.PlayRound(0, 1);
console.log(gameBoard.getBoard())

game.PlayRound(0,0);
console.log(gameBoard.getBoard())