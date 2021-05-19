import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import actions from '../../store/actions/actions'

const Success = (props) => {
    const { increment_id } = props.location

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.resetCart())
        dispatch(actions.resetCheckout())
        dispatch(actions.resetOrder())
    }, [])

    return (
        <div className="row">
            <div className="col text-center">
                <h1>Order Placed Succesfully! The Order number is {increment_id}</h1>
            </div>
        </div>
    )
}

export default Success