import React from "react";
import ValidationMessage from './ValidationMessage'

const Select = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <select className="form-control" name={props.name} value={props.selected} onChange={(e) => props.changeSelect(e.target.value)}>
                <option value="" disabled>Choose</option>
                {
                    props.data.map((row, _i) => <option key={`${props.name}-${_i}`} value={row.id}>{row.name}</option>)
                }
            </select>
            <ValidationMessage isValid={props.isValid} message={props.msg} />
        </div>
    )
}

export default Select