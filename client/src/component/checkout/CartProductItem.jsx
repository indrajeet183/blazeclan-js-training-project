import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../store/actions/actions'

const CartProductItem = () => {

    const cartState = useSelector(state => state.carts)
    let dispatch = useDispatch()

    const cartProducts = cartState.products

    const handeOnUpateQty = (id, qty) => {
        dispatch(actions.updateCartItemQty(id, qty))
    }

    // useEffect(() => {

    // }, [cartProducts])

    const handleRemoveItem = (id) => {
        dispatch(actions.deleteCartItem(id))
    }

    return (
        cartProducts.length ? (
            cartProducts.map((product, _i) => {
                return (
                    <React.Fragment key={`card-products-row-${_i}`}>
                        <div className="card-products-row mt-3" >
                            <div className="col">
                                <div className="d-block card-products-row--img" alt="Dell Inspiron 5000" style={{ backgroundImage: `url("http://localhost:5005/${product.base_image}")` }} ></div>
                            </div>
                            <div className="col">
                                <div className="cart-products-row--item-price">
                                    <small>{product.name}</small>
                                </div>
                                <div>
                                    <span>{product.price} /-</span>
                                </div>
                            </div>
                            <div className="col cart-products-row--item">
                                <div className="mr-1">
                                    <button className="btn btn-dark btn-sm" onClick={(e) => handeOnUpateQty(product.id, 'minus')}>-</button>
                                </div>
                                <div className="">
                                    <input className="cart-product--qty" type="number" value={product.qty} onChange={(e) => handeOnUpateQty(product.id, parseInt(e.target.value))} />
                                </div>
                                <div className="ml-1">
                                    <button className="btn btn-dark btn-sm" onClick={(e) => handeOnUpateQty(product.id, 'plus')}>+</button>
                                </div>
                                <div className="cart-product-row-item--remove">
                                    <span className="" onClick={() => handleRemoveItem(product.id)}>Remove</span>
                                </div>
                            </div>
                        </div >
                        <hr />
                    </React.Fragment>)
            })
        ) : <span>Empty Cart</span>
    )
}

export default CartProductItem