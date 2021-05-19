import React, { useEffect, useState } from 'react'
import actions from '../../store/actions/actions'
import { useDispatch, useSelector } from 'react-redux'


const Checkout = (props) => {
    let dispatch = useDispatch()
    let checkoutState = useSelector(state => state.checkout)
    let cartState = useSelector(state => state.carts)
    let orderState = useSelector(state => state.orders)
    let userState = useSelector(state => state.user)

    const [checkoutData, setCheckoutData] = useState({
        carrier: 'choose',
        shippingMethod: 'choose',
        paymentMethod: 'choose',
        rate: 0,
        shippingCode: "",
        method_id: ""
    })

    if (orderState.success) {
        props.history.push({
            pathname: '/success',
            increment_id: orderState.success_increment_id
        })
    }

    const [customerInfo, setCustomerInfo] = useState({
        first_name: "", last_name: "", middle_name: "",
        city: "", state: "", postal_code: "", country: "",
        address_line_1: "", address_line_2: "", mobile: "",
        customer_id: sessionStorage.getItem('customer_id') === null ? false : parseInt(sessionStorage.getItem('customer_id'))
    })

    useEffect(() => {
        if (!userState.loggedIn) {
            props.history.push('/login')
        }
        dispatch(actions.getPaymentMethods())
        dispatch(actions.getShippingMethodsByCarrier())
    }, [])

    useEffect(() => {
        dispatch(actions.updateCheckoutData({ checkout: checkoutData, cart: { ...cartState } }))
    }, [checkoutData])

    const getGrandTotal = () => {

        if (!checkoutState.checkoutData) return 0

        const { rate } = checkoutState.checkoutData.checkout
        const { subTotal, tax } = cartState

        return (rate + subTotal + tax).toFixed(2)
    }

    const getMethodsByCarrier = () => {
        return checkoutData.carrier === 'choose' ? [] : checkoutState.shipping_methods[checkoutData.carrier]
    }

    const handleOnCarrierSelect = (e) => {
        setCheckoutData({ ...checkoutData, shippingMethod: 'choose', carrier: e.target.value })
    }

    const handleOnPaymentSelect = (e) => {
        setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })
    }

    const handleOnShippingSelect = (e) => {
        const [code, rate, id] = e.target.value.split(":")
        setCheckoutData({ ...checkoutData, shippingMethod: e.target.value, method_id: parseInt(id), shippingCode: code, rate: parseFloat(rate) })
    }

    const handlePlaceOrder = (e) => {
        let orderData = {
            address: customerInfo,
            checkout: checkoutState.checkoutData.checkout,
            cart: cartState
        }

        dispatch(actions.addOrder(orderData))
    }

    const handleCustomerInfoChange = (e) => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: e.target.value
        })
    }

    let checkoutComponent = (
        <div className="row mt-4">
            <div className="col-lg-4 col-md-4">
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input className="form-control" type="text" name="first_name" value={customerInfo.first_name} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input className="form-control" type="text" name="last_name" value={customerInfo.last_name} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="middle_name">Middle Name</label>
                    <input className="form-control" type="text" name="middle_name" value={customerInfo.middle_name} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input className="form-control" type="text" name="mobile" value={customerInfo.mobile} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input className="form-control" type="text" name="country" value={customerInfo.country} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input className="form-control" type="text" name="state" value={customerInfo.state} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input className="form-control" type="text" name="city" value={customerInfo.city} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="address_line_1">Address Line 1</label>
                    <input className="form-control" type="text" name="address_line_1" value={customerInfo.address_line_1} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="address_line_2">Address Line 2</label>
                    <input className="form-control" type="text" name="address_line_2" value={customerInfo.address_line_2} onChange={handleCustomerInfoChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="postal_code">Postal Code</label>
                    <input className="form-control" type="text" name="postal_code" value={customerInfo.postal_code} onChange={handleCustomerInfoChange} />
                </div>
            </div>

            <div className="col-lg-4 col-md-4">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label htmlFor="shipping">Shipping Carrier</label>
                            <select className="form-control" type="text" name="shipping_carrier" value={checkoutData.carrier} onChange={handleOnCarrierSelect}>
                                <option disabled value="choose">choose</option>
                                {checkoutState.shipping_carriers.length > 0 ?
                                    checkoutState.shipping_carriers.map((carrier, _i) => <option key={`payment_method--${_i}`} value={carrier}>{carrier}</option>)
                                    : ""}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label htmlFor="shipping">Shipping Method</label>
                            <select className="form-control" type="text" name="shipping_method" disabled={!getMethodsByCarrier().length > 0} onChange={handleOnShippingSelect} value={checkoutData.shippingMethod}>
                                <option disabled value="choose">choose</option>
                                {getMethodsByCarrier().length > 0 ?
                                    getMethodsByCarrier().map((method, _i) => <option key={`payment_method--${_i}`} value={`${method.code}:${method.rate}:${method.id}`}>{method.label}</option>)
                                    : ""}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="payment">Payment Method</label>
                            <select className="form-control" type="text" name="payment" value={checkoutData.paymentMethod} onChange={handleOnPaymentSelect}>
                                <option disabled value="choose">choose</option>
                                {checkoutState.payment_methods.length > 0 ?
                                    checkoutState.payment_methods.map((method, _i) => <option key={`payment_method--${_i}`} value={method.code}>{method.label}</option>)
                                    : ""}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-4">
                <div className="card">
                    <div className="card-header text-center">Order Summary</div>
                    <div className="card-body row">
                        <table className="table summary-table">
                            <tbody>
                                <tr>
                                    <td>Sub Total</td>
                                    <td>{cartState.subTotal.toFixed(2)} /-</td>
                                </tr>
                                <tr>
                                    <td>Tax</td>
                                    <td>{cartState.tax.toFixed(2)} /-</td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td>{checkoutState.checkoutData ? checkoutState.checkoutData.checkout.rate.toFixed(2) : 0} /-</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td><strong>Total</strong></td>
                                    <td><strong>{getGrandTotal()} /-</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success btn-block" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            </div>

        </div>
    )

    return cartState.products.length > 0 ? checkoutComponent : <div className="row mt-5">
        <div className="col text-center">
            <h1>No Items in Cart</h1>
        </div>
    </div>

}

export default Checkout;