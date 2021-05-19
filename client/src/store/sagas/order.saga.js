import { takeLatest, call, put } from 'redux-saga/effects'
import actions from '../actions/actions'
import OrderService from '../../services/order'

const orderService = new OrderService()


/* START get orders */
async function createOrder(orderData) {
    const result = await orderService.createOrder(orderData)
    return result
}

function* dispatchCreareOrder(action) {
    try {
        let response = yield call(createOrder, action.data)
        // console.log(response)
        if (response.data.success) {
            yield put({
                type: actions.ADD_ORDER_SUCCESS,
                order: response.data.data,
                msg: response.data.msg
            })
        } else {
            yield put({
                type: actions.ADD_ORDER_FAILED,
                msg: response.data.msg
            })
        }
    } catch (err) {
        yield put({
            type: actions.ADD_ORDER_FAILED,
            msg: err.response.data.msg
        })
    }
}

export function* listenCreateOrder() {
    yield takeLatest(actions.ADD_ORDER, dispatchCreareOrder)
}
/* END get orders */