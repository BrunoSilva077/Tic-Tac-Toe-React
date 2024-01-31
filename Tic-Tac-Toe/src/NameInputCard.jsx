import PlayerInput from "./PlayerInput";
import PropTypes from 'prop-types';

export function NameInputCard( {names,onNamesSubmit,playerOne,playerTwo,setPlayerOne,setPlayerTwo} ){

    return (
        <>
        <div className={"card-initial " + (names ? 'hidden' : '')}>
        <h1>Insert names of players</h1>
        <PlayerInput type="text" 
            id="playerOne"
            value={playerOne}
            onChange={setPlayerOne}
            label="Player One"
        />
        <PlayerInput type="text" 
            id="playerTwo"
            value={playerTwo}
            onChange={setPlayerTwo}
            label="Player Two"
        />
        <button onClick={onNamesSubmit} className='btn'>Play Game</button>
      </div>
        </>
    )
}

NameInputCard.propTypes={
  names:PropTypes.bool.isRequired,
  onNamesSubmit:PropTypes.func.isRequired,
  playerOne:PropTypes.string.isRequired,
  playerTwo:PropTypes.string.isRequired,
  setPlayerOne:PropTypes.func.isRequired,
  setPlayerTwo:PropTypes.func.isRequired
}