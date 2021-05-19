import React from 'react'
import { Link } from 'react-router-dom'

const MyAccountSidebar = (props) => {

    const pathName = props.location.pathname

    return (
        <div className="col-lg-2 col-md-2">
            <div className="card myaccount-list-sidebar">
                <div className="card-body">
                    <nav className="nav flex-column">
                        <Link to="/myaccount" className={`nav-link ${pathName === '/myaccount' ? 'active' : ""}`}>Account</Link>
                        <Link to="/myorders" className={`nav-link ${pathName === '/myorders' ? 'active' : ""}`}>My Orders</Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default MyAccountSidebar