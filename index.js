
let gameBoard = (function(){
    const rows = 3;
    const columns = 3;
    
    let board = [];

    let playerOneScoreValue = 0;
    let playerTwoScoreValue = 0; 
 
    
    let getPlayerOneScore = ()=>{
        return playerOneScoreValue
    }

    let getPlayerTwoScore = () =>{
        return playerTwoScoreValue
    }

    let setPlayerOneScore = (value) =>{
        playerOneScoreValue =  value
    }

    let setPlayerTwoScore = (value) =>{
        playerTwoScoreValue =  value
    }


    const winningCombinations = [
        //Horzontal win
        [[0, 0], [0, 1],[0, 2]],
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
            
         
           
        }
        
        return;
    }
    
   
    
    return { getBoard, dropToken, winningCombinations, getPlayerOneScore, getPlayerTwoScore, setPlayerOneScore, setPlayerTwoScore }
})();


function gameController(playerOne = 'Player One', playerTwo = 'Player Two'){
    let board = gameBoard.getBoard();
    let gameActive = true;
    
    const buttonCell = document.querySelectorAll('.cell');
    const roundMessage= document.querySelector(`#roundMessage`);
    const formSubmitBtn = document.querySelector('.formSubmitBtn');
    const playerOneName = document.querySelector('#playerOne');
    const playerTwoName = document.querySelector('#playerTwo');
    const startupModal = document.querySelector('.startupModal');
    const computerModeBtn= document.querySelector('.computerModeBtn');






    let getNames = () =>{
        console.log(playerOneName.value, playerTwoName.value)
        
    }

    formSubmitBtn.addEventListener('click', (e)=>{
        e.preventDefault();

        getNames();

        startupModal.close();
    })

    


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
        
        
        gameBoard.winningCombinations.forEach((arr)=>{
            const isWinningCombination = arr.every((cell)=>{
                return board[cell[0]][cell[1]] === token

                
            })
            if(isWinningCombination){
                gameActive = false;

                arr.forEach((cell)=>{
                    const row = cell[0];
                    const column = cell[1];

                    const winningCell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);

                    winningCell.classList.add('winningCell')
                    roundMessage.textContent = `${currentPlayer.name} is the winner!`
                   

                });
                if (currentPlayer === Players[0]) {
                    let playerScoreValue = gameBoard.getPlayerOneScore();
                    playerScoreValue += 1;
                    gameBoard.setPlayerOneScore(playerScoreValue); 
                    playerOneScore.textContent = playerScoreValue; 
                } else if (currentPlayer === Players[1]) {
                    let playerScoreValue = gameBoard.getPlayerTwoScore();
                    playerScoreValue += 1;
                    gameBoard.setPlayerTwoScore(playerScoreValue); 
                    playerTwoScore.textContent = playerScoreValue; 
                }

               
                
                
            }
        })

    
    };
    
    const checkDraw = () =>{
        
        const isDraw = board.every((arr)=>{
            return !arr.includes(null)
        })
        
        if(isDraw){
            gameActive = false
            roundMessage.textContent = `It's a Draw!`

        }
        
    }
    
    const PlayRound = (row, column) =>{
        if(gameActive){
            gameBoard.dropToken(row, column, getCurrentPlayer().token);

            const btn = document.querySelector(`[data-row = "${row}"][data-column = "${column}"]`);
            btn.textContent = gameBoard.getBoard()[row][column]
            

            checkWinner(getCurrentPlayer().token);

            if(!gameActive){
                setTimeout(()=>{
                    resetBoard();
                    startNextRound();
                }, 1000)
            }
            if(gameActive){
                checkDraw();

                if(!gameActive){
                    setTimeout(()=>{
                        resetBoard();
                        startNextRound();
                    }, 1000)
                }else{
                    switchPlayer()
                }

            }
           
        }

        function resetBoard(){
            for(let i = 0; i < 3; i++){
             for(let j = 0; j < 3; j++){
                 board[i][j] = null
             }
         }
             buttonCell.forEach((btn)=>{
                btn.textContent = ''
                btn.classList.remove('winningCell')
                
             })
             roundMessage.textContent = ''
             currentPlayer = Players[0]

         
        }

        function startNextRound(){
            gameActive= true;
        }

        restartBtn.addEventListener('click', ()=>{
        gameActive = true
            for(let i = 0; i < 3; i++){
             for(let j = 0; j < 3; j++){
                 board[i][j] = null
             }
         }
         if(gameActive){

             buttonCell.forEach((btn)=>{
                btn.textContent = ''
                btn.classList.remove('winningCell')
                
             })
             roundMessage.textContent = ''
             currentPlayer = Players[0]

         }
     
     
     
         })

    }

  
    
    
    buttonCell.forEach((btn)=>{
        

        btn.addEventListener('click', ()=>{
            if (btn.textContent !== '') return;

            let row = btn.getAttribute('data-row');
            let column = btn.getAttribute('data-column')
         
            PlayRound(row, column)

        })

    })
    
    
    return {
        getCurrentPlayer,
        switchPlayer,
        PlayRound,
        
    }
    

}

    const restartBtn = document.querySelector('.restartBtn');
    const playerOneScore = document.querySelector('.playerOneScore');
    const playerTwoScore = document.querySelector('.playerTwoScore');

restartBtn.addEventListener('click', ()=>{
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0
})
const game = gameController();















