import React from 'react'

const Alert = (props) => {
    return (
        <div className={(props.type === 'success' ? " alert alert-success" : "alert alert-danger") + (props.show ? "" : " d-none") + " mt-5"}>
            {props.message}
        </div>
    )
}

export default Alert