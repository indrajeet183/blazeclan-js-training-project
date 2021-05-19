import { takeLatest, call, put } from 'redux-saga/effects'
import actions from '../actions/actions'
import CheckoutService from '../../services/checkout'

const checkoutService = new CheckoutService()


/* START get payment methods */
async function getPaymentMethods() {
    const result = await checkoutService.getPaymentMethods()
    return result
}

function* dispatchGetPaymentMethods() {
    const response = yield call(getPaymentMethods)
    console.log(response)
    if (response.data.success) {
        yield put({
            type: actions.FETCH_PAYMENT_METHODS_SUCCESS,
            payment_methods: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.FETCH_PAYMENT_METHODS_FAILED,
            msg: response.data.msg
        })
    }
}

export function* listenGetPaymentMethods() {
    yield takeLatest(actions.GET_PAYMENT_METHODS, dispatchGetPaymentMethods)
}
/* END get payment methods */

/* START get payment methods */
async function getShippingMethodsByCarrier() {
    const result = await checkoutService.getShippingMethodsByCarrier()
    return result
}

function* dispatchGetShippingMethodsByCarrier() {
    const response = yield call(getShippingMethodsByCarrier)
    // console.log(response)
    if (response.data.success) {
        yield put({
            type: actions.FETCH_SHIPPING_METHODS_BY_CARRIER_SUCCESS,
            shipping_methods: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.FETCH_SHIPPING_METHODS_BY_CARRIER_FAILED,
            msg: response.data.msg
        })
    }
}

export function* listenGetShippingMethodsByCarrier() {
    yield takeLatest(actions.GET_SHIPPING_METHODS_BY_CARRIER, dispatchGetShippingMethodsByCarrier)
}
/* END get payment methods */