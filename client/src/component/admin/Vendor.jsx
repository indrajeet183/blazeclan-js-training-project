import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../store/actions/actions'

const Vendor = (props) => {

    let dispatch = useDispatch()
    let vendorState = useSelector(state => state.vendors)
    const [showMsg, setShowMsg] = useState(false)

    useEffect(() => {
        dispatch(actions.getVendors())
    }, [])

    useEffect(() => {
        if (vendorState.result.msg.length > 0) {
            setShowMsg(true)
            setTimeout(() => {
                setShowMsg(false)
            }, 1500)
        }
    }, [vendorState.result])

    const onHandleStatusChange = (e) => {
        const id = e.target.name
        const name = e.target.innerText
        const status = (name === 'Approve') ? 1 : 0

        dispatch(actions.updateVendorStatus(parseInt(id), status))
    }

    return (
        <div className="row mt-4">
            <div className="col">
                {vendorState.vendors.length > 0 ?
                    (<table className="table table-sm mt-3">
                        <thead className="bg-dark thead-dark">
                            <tr>
                                {Object.keys(vendorState.vendors[0]).map((col, _i) => <th key={`order-th-${_i}`}>{col.toUpperCase()}</th>)}
                                <th colSpan="2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vendorState.vendors.map((row, _i) => {
                                    return (
                                        <tr key={`order-tr-${_i}`}>
                                            {Object.keys(row).map((col, _i) => <td key={`order-td-${_i}`}>{row[col]}</td>)}
                                            <td> <button className="btn btn-success btn-block"
                                                name={row['id']} disabled={row['status']} onClick={onHandleStatusChange}>Approve</button> </td>
                                            <td> <button className="btn btn-danger ml-3 btn-block"
                                                name={row['id']} disabled={!row['status']} onClick={onHandleStatusChange}>Reject</button> </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>) : <div>Not Data!</div>}
                <div class={`alert mt-5 alert-${vendorState.result.success ? "success" : "danger"}${showMsg ? "" : " d-none"}`} role="alert">{vendorState.result.msg}</div>
            </div>
        </div>
    )
}

export default Vendor