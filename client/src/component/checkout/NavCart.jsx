import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import CartProducts from './CartProducts'
import { Link } from 'react-router-dom'

const Cart = (props) => {

    const cartState = useSelector(state => state.carts)
    const cartQty = cartState.totalQty > 0 ? cartState.totalQty : 0
    const [toggleCartDropdown, setToggleCartDropdown] = useState(false)

    const handleOnCart = () => {
        setToggleCartDropdown(!toggleCartDropdown)
    }

    useEffect(() => {
        setToggleCartDropdown(false)
    }, [])

    return (
        <>
            <FontAwesomeIcon className="nav-cart-icon" icon={faShoppingCart} size="2x" color="white" onClick={handleOnCart} />
            {cartQty > 0 ? <h5><span className="badge badge-danger nav-cart-icon--count">{cartQty}</span></h5> : ""}
            <div className={`card nav-cart-dropdown ${toggleCartDropdown ? "" : ' d-none'}`}>
                <div className="card-header text-center"> Cart </div>
                <CartProducts />
                <div className="card-footer">
                    <Link to='/checkout'><button className="btn btn-danger btn-block">Checkout</button></Link>
                </div>
            </div>
        </>
    )
}

export default Cart