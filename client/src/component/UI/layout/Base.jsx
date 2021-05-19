import React, { useState, useEffect } from 'react'
import { MainContext } from '../../maincontext'
import NavCart from '../../checkout/NavCart'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export const Base = (props) => {

    const [alert, setAlert] = useState({ msg: "TEST", type: "success", toggeled: false })

    // useEffect(() => {
    //     setTimeout(() => {
    //         setAlert({ ...alert, toggeled: false })
    //     }, 2500)
    // }, [alert])

    const showAlert = (alert) => {
        setAlert(alert)
    }

    const userState = useSelector(state => state.user)

    // console.log(auth, role)

    useEffect(() => {
        if (!userState.loggedIn) window.sessionStorage.clear()
    }, [])

    let navComponent = <div className="navbar-nav">
        <Link className={`${window.location.pathname === '/' ? 'nav-link active' : 'nav-link'}`} to="/">Home</Link>
        <Link className={`${window.location.pathname === '/signup' ? 'nav-link active' : 'nav-link'}`} to="/signup">Registration</Link>
        <Link className={`${window.location.pathname === '/login' ? 'nav-link active' : 'nav-link'}`} to="/login">Login</Link>
        <Link className={`${window.location.pathname === '/products' ? 'nav-link active' : 'nav-link'}`} to="/products">Products</Link>
    </div>

    if (userState.loggedIn && userState.role === 'customer') {
        navComponent = <div className="navbar-nav">
            <Link className={`${window.location.pathname === '/' ? 'nav-link active' : 'nav-link'}`} to="/">Home</Link>
            <Link className={`${window.location.pathname === '/products' ? 'nav-link active' : 'nav-link'}`} to="/products">Products</Link>
            <Link className={`${window.location.pathname === '/myaccount' ? 'nav-link active' : 'nav-link'}`} to="/myaccount">My Account</Link>
            <Link className={`${window.location.pathname === '/logout' ? 'nav-link active' : 'nav-link'}`} to="/logout">Logout</Link>
        </div>
    }

    if (userState.loggedIn && userState.role === 'admin') {
        navComponent = <div className="navbar-nav">
            <Link className={`${window.location.pathname === '/' ? 'nav-link active' : 'nav-link'}`} to="/">Home</Link>
            <Link className={`${window.location.pathname === '/products' ? 'nav-link active' : 'nav-link'}`} to="/products">Products</Link>
            <Link className={`${window.location.pathname === '/product' ? 'nav-link active' : 'nav-link'}`} to="/product">Product Create</Link>
            <Link className={`${window.location.pathname === '/category' ? 'nav-link active' : 'nav-link'}`} to="/category">Category</Link>
            <Link className={`${window.location.pathname === '/vendor' ? 'nav-link active' : 'nav-link'}`} to="/vendor">Vendor</Link>
            <Link className={`${window.location.pathname === '/logout' ? 'nav-link active' : 'nav-link'}`} to="/logout">Logout</Link>
        </div>
    }

    if (userState.loggedIn && userState.role === 'vendor') {
        navComponent = <div className="navbar-nav">
            <Link className={`${window.location.pathname === '/' ? 'nav-link active' : 'nav-link'}`} to="/">Home</Link>
            <Link className={`${window.location.pathname === '/products' ? 'nav-link active' : 'nav-link'}`} to="/products">Products</Link>
            <Link className={`${window.location.pathname === '/product' ? 'nav-link active' : 'nav-link'}`} to="/product">Product Create</Link>
            <Link className={`${window.location.pathname === '/logout' ? 'nav-link active' : 'nav-link'}`} to="/logout">Logout</Link>
        </div>
    }

    return (
        <MainContext.Provider value={{ showAlert }}>
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {navComponent}

                        {!(userState.role === 'vendor' || userState.role === 'admin') ? <NavCart /> : ""}
                    </div>
                </nav>
                <div className="container-fluid">
                    {props.children}
                </div>

                <div className={"alert alert-" + alert.type + (alert.toggeled ? "" : " d-none")} role="alert">
                    {alert.msg}
                </div>
            </div>
        </MainContext.Provider>
    )
}