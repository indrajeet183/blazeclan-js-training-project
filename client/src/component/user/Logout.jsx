import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import actions from '../../store/actions/actions'

const Logout = (props) => {

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.logoutUser())
        window.sessionStorage.clear()
        setTimeout(() => {
            props.history.push('/products')
        }, 2500)

    }, [])

    return (
        <div className="row">
            <div className="col text-center">
                <h1>You're succesfully logged out!</h1>
            </div>
        </div>
    )
}

export default Logout