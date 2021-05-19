export const UPDATE_CHECKOUT_DATA = 'UPDATE_CHEKCOUT_DATA'
export const GET_SHIPPING_METHODS_BY_CARRIER = 'GET_SHIPPING_METHODS_BY_CARRIER'
export const GET_PAYMENT_METHODS = 'GET_PAYMENT_METHODS'
export const FETCH_SHIPPING_METHODS_BY_CARRIER_SUCCESS = 'FETCH_SHIPPING_METHODS_BY_CARRIER_SUCCESS'
export const FETCH_SHIPPING_METHODS_BY_CARRIER_FAILED = 'FETCH_SHIPPING_METHODS_BY_CARRIER_FAILED'
export const FETCH_PAYMENT_METHODS_SUCCESS = 'FETCH_PAYMENT_METHODS_SUCCESS'
export const FETCH_PAYMENT_METHODS_FAILED = 'FETCH_PAYMENT_METHODS_FAILED'
export const RESET_CHECKOUT = 'RESET_CHECKOUT'

export const updateCheckoutData = (data) => {
    return {
        type: UPDATE_CHECKOUT_DATA,
        data
    }
}

export const getShippingMethodsByCarrier = () => {
    return {
        type: GET_SHIPPING_METHODS_BY_CARRIER
    }
}

export const getPaymentMethods = () => {
    return {
        type: GET_PAYMENT_METHODS
    }
}

export const resetCheckout = () => {
    return {
        type: RESET_CHECKOUT
    }
}