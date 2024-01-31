import { useEffect, useState } from 'react'
import { NameInputCard } from './NameInputCard'
import { Board } from './Board'

function App() {
  const [playerOne, setPlayerOne] = useState(() =>{

    const playerOneLocal = localStorage.getItem('PlayerOne');
    return playerOneLocal ? JSON.parse(playerOneLocal) : '';

    })
  const [playerTwo, setPlayerTwo] = useState(() =>{
    
  const playerTwoLocal = localStorage.getItem('PlayerTwo');
  return playerTwoLocal ? JSON.parse(playerTwoLocal) : '';

  })
  const [namesEntered, setNamesEntered] = useState(() =>{
    return localStorage.getItem('NamesEntered') || false
  })
  const [currentPlayer, setCurrentPlayer] = useState(() =>{
    if (localStorage.getItem("CurrentPlayer")){
      return JSON.parse(localStorage.getItem("CurrentPlayer"))
      } else {return "X"}
    })
  const [board,setBoard] = useState( () =>{
    const localBoard = localStorage.getItem("Board")
    if (localBoard == null) return Array(9).fill('')

    return JSON.parse(localBoard)
  })
  const [playerOneWins,setPlayerOneWins] = useState(() =>{
    let playerOneWinCount = localStorage.getItem('PlayerOneWins')
    if (playerOneWinCount === null){
      playerOneWinCount=0
      localStorage.setItem('PlayerOneWins',playerOneWinCount)
      }
    return parseInt(playerOneWinCount)
  })
  const [playerTwoWins,setPlayerTwoWins] = useState(() =>{
    let playerTwoWinCount = localStorage.getItem('PlayerTwoWins')
    if (playerTwoWinCount === null){
      playerTwoWinCount=0
      localStorage.setItem('PlayerTwoWins',playerTwoWinCount)
      }
    return parseInt(playerTwoWinCount)
  })

  useEffect(() => {
    localStorage.setItem("PlayerOne",JSON.stringify(playerOne))
    localStorage.setItem("PlayerTwo", JSON.stringify(playerTwo))
    localStorage.setItem("NamesEntered",JSON.stringify(namesEntered))
    localStorage.setItem("PlayerOneWins",JSON.stringify(playerOneWins))
    localStorage.setItem("PlayerTwoWins",JSON.stringify(playerTwoWins))
    localStorage.setItem("CurrentPlayer",JSON.stringify(currentPlayer))
    localStorage.setItem("Board",JSON.stringify(board))
    },[playerOne,playerTwo,namesEntered,currentPlayer,board,playerOneWins,playerTwoWins])

  const handleNamesSubmit =() => {
    if(playerOne.trim().length == 0 || playerTwo.trim().length == 0){
      alert('Insert player names');
      return
    } 
    setPlayerOne(playerOne);
    setPlayerTwo(playerTwo);
    setNamesEntered(true)

  }

  const switchPlayer = () => {
    setCurrentPlayer( currentPlayer === "X" ? "O" : "X" )
  }

  const cleanBoard = ( () => {
    const clearedBoard = [...board]
    for (let i=0;i<clearedBoard.length;i++){
      clearedBoard[i]= ''
    }
    setBoard(clearedBoard)
  })

  const handleSquareClick = ( (index) => {

    if(board[index] !== '') return

    if(board[index] === ''){
      const newBoard = [...board]
      newBoard[index] = currentPlayer
      setBoard(newBoard)

      if( checkWinner(newBoard) === 'X' ){

        setPlayerOneWins(playerOneWins +1)

        cleanBoard()

      }else if( checkWinner(newBoard) === 'O'){

        setPlayerTwoWins(playerTwoWins+1)

        cleanBoard()
      }
    }

    console.log("current player after check ", currentPlayer)

    switchPlayer()
  })

  const checkWinner = ((board) => {

  // check the win in lines  
  for (let i = 0; i < 3; i++) {
    const startIndex = i * 3;
    if (
      board[startIndex] !== '' &&
      board[startIndex] === board[startIndex + 1] &&
      board[startIndex] === board[startIndex + 2]
    ) {
      return board[startIndex];
    }
  }

  // check the win in columns
  for (let i = 0; i < 3; i++) {
    if (
      board[i] !== '' &&
      board[i] === board[i + 3] &&
      board[i] === board[i + 6]
    ) {
      return board[i];
    }
  }

  // check the win in diagonals
  if (
    board[0] !== '' &&
    board[0] === board[4] &&
    board[0] === board[8]
  ) {
    return board[0];
  }

  if (
    board[2] !== '' &&
    board[2] === board[4] &&
    board[2] === board[6]
  ) {
    return board[2];
  }

  return false;
  })

  const resetGame = () => {
    setPlayerOne('')
    setPlayerTwo('')
    setNamesEntered(false)
    setPlayerOneWins(0)
    setPlayerTwoWins(0)
    setCurrentPlayer('X');
    setBoard(Array(9).fill(''))
  };

  return (
    <>        
      <h1 className='tittle'>Tic Tac Toe</h1>

      {namesEntered ? (
        <>
          <h1 className='tittle players'>{playerOne} vs {playerTwo}</h1>
          <h2 className='tittle players'>{playerOne} wins - {playerOneWins} | {playerTwo} wins - {playerTwoWins}</h2>
          <button className='btn reset' onClick={resetGame}>Reset Game</button>
          <Board
            board={board}
            handleSquareClick={handleSquareClick}
            currentPlayer={currentPlayer}
          />
        </>
      ) :       
          <NameInputCard
          onNamesSubmit={handleNamesSubmit}
          names={namesEntered}
          playerOne={playerOne}
          playerTwo={playerTwo}
          setPlayerOne={setPlayerOne}
          setPlayerTwo={setPlayerTwo}
        />
      }
    </>
  )
}

export default App