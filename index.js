let gameBoard = (function(){
    let board = [];


    const rows = 3
    const columns = 3

    for(let i = 0; i <rows; i++){
        board[i] = []
        for(let j = 0; j < columns; j++){
            board[i].push(1)
        }
    };

    const getBoard = () => board;

    


    return { getBoard }


    
})()

console.log(gameBoard.getBoard())

