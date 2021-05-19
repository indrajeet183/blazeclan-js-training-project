import React from 'react'

const ValidationMessage = (props) => {
    // console.log(props)
    return (
        <div className={`${props.isValid ? 'invalid-message' : 'd-none'}`} >
            {props.message}
        </div >
    )
}

export default ValidationMessage