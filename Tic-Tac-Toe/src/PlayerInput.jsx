import PropTypes from 'prop-types';


export default function PlayerInput( {id,value,onChange,label} ){

    return(
        <>
            <div className="names">
            <label htmlFor={id}>{label}</label>
            <input
                type="text" 
                id={id}
                value={value}
                onChange={e => onChange(e.target.value)}
                maxLength="10"
            />
            </div>
        </>
    )
}

PlayerInput.propTypes={
    id:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired
}