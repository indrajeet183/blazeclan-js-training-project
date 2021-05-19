import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './MyAccountSidebar'
import actions from '../../store/actions/actions'

const MyAccount = (props) => {

    let dispatch = useDispatch()
    let userState = useSelector(state => state.user)

    const [accountData, setAccountData] = useState(false)
    const [showMsg, setShowMsg] = useState(false)

    useEffect(() => {
        dispatch(actions.getMyAccountInfo())
    }, [])

    useEffect(() => {
        if (userState.myAccount) {
            setAccountData(userState.myAccount)
        }
    }, [userState])

    useEffect(() => {
        setShowMsg(true)
        setTimeout(() => {
            setShowMsg(false)
        }, 1500)
    }, [userState.result])

    const handleOnInputChange = (e) => {
        setAccountData({
            ...accountData, [e.target.name]: e.target.value
        })
    }

    const handleOnUpdateMyAccount = () => {
        dispatch(actions.updateMyAccountInfo(accountData))
    }

    const handleOnClear = () => {
        if (accountData !== false) {
            let tempObj = { ...accountData }
            Object.keys(tempObj).forEach(field => tempObj[field] = "")
            setAccountData(tempObj)
        }
    }



    return (
        <div className="row mt-4">
            <SideBar {...props} />
            {accountData !== false ? <div className="col-lg-4">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="text" name="email" value={accountData.email} onChange={handleOnInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input className="form-control" type="text" name="first_name" value={accountData.first_name} onChange={handleOnInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input className="form-control" type="text" name="last_name" value={accountData.last_name} onChange={handleOnInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="middle_name">Middle Name(Optional)</label>
                    <input className="form-control" type="text" name="middle_name" value={accountData.middle_name} onChange={handleOnInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="primary_mobile">Primary Mobile</label>
                    <input className="form-control" type="text" name="primary_mobile" value={accountData.primary_mobile} onChange={handleOnInputChange} />
                </div>

                <button className="btn btn-success" onClick={handleOnUpdateMyAccount}>Update</button>
                <button className="btn btn-warning ml-4" onClick={handleOnClear}>Clear</button>
                <div class={`alert mt-5 alert-${userState.result.success ? "success" : "danger"}${showMsg ? "" : " d-none"}`} role="alert">{userState.result.msg}</div>
            </div> : ""}
        </div>
    )
}

export default MyAccount