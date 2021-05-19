import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './MyAccountSidebar'
import actions from '../../store/actions/actions'

const MyOrders = (props) => {

    let dispatch = useDispatch()
    const customerState = useSelector(state => state.user)
    console.log(customerState)
    const [columns, setColumns] = useState([])

    useEffect(() => {
        dispatch(actions.getMyOrders())
    }, [])

    useEffect(() => {
        if (customerState.myOrders.length > 0) {
            let tempCols = [...Object.keys(customerState.myOrders[0])]
            tempCols.splice(tempCols.indexOf('id'), 1)
            tempCols.splice(tempCols.indexOf('shipment_id'), 1)
            tempCols.splice(tempCols.indexOf('payment_id'), 1)
            setColumns(tempCols)
        }
    }, [customerState.myOrders])

    return (
        <div className="row mt-4">
            <SideBar {...props} />
            <div className="col-lg-9">
                <table className="table table-sm">
                    <thead className="bg-dark thead-dark">
                        <tr>
                            {columns.map((col, _i) => <th key={`order-th-${_i}`}>{col.toUpperCase()}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerState.myOrders.map((row, _i) => {
                                return (
                                    <tr key={`order-tr-${_i}`}>
                                        {columns.map((col, _i) => <td key={`order-td-${_i}`}>{row[col]}</td>)}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrders