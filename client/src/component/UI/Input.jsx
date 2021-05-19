import React from 'react'
import ValidationMessage from '../UI/ValidationMessage'

export const Input = (props) => {
    return (<div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input className="form-control" value={props.value} type={props.type} name={props.name} onChange={(e) => props.handleChange(e)} />
        <ValidationMessage isValid={props.isValid} message={props.msg} />
    </div>)
}