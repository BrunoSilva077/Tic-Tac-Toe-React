import PropTypes from 'prop-types';

export function Board( {board,handleSquareClick,currentPlayer} ){
    return(    
        <>
            <p className='tittle' style={{marginBottom:0}}>its player {currentPlayer} turn</p>
            <div className="game-setup">
                <div className="board">
                {board.map( (value,index) =>(
                    <div 
                    className="square"
                    key={index}
                    onClick={() => handleSquareClick(index)}
                    >
                    {value}
                    </div>
                ))}
                </div>
            </div>
        </>
  )
}

Board.propTypes = {
    board: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleSquareClick: PropTypes.func.isRequired,
    currentPlayer: PropTypes.string.isRequired,
}