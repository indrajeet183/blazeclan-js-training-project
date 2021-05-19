import { takeLatest, call, put } from 'redux-saga/effects'
import actions from '../actions/actions'
import UserService from '../../services/user/user'
import OrderService from '../../services/order'

const userService = new UserService()
const orderService = new OrderService()

/* START get customer orders */
async function getOrderByCustomer() {
    return await orderService.getOrderByCustomer()
}

function* dispatchGetOrdersByCustomer(action) {
    // console.log(action)
    const response = yield call(getOrderByCustomer)
    console.log(response)
    if (response.data.success) {
        yield put({
            type: actions.FETCH_MY_ORDERS_SUCCESS,
            orders: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.FETCH_MY_ORDERS_FAILED,
            msg: response.data.msg
        })
    }
}

export function* listenGetOrdersByCustomer() {
    yield takeLatest(actions.GET_MY_ORDERS, dispatchGetOrdersByCustomer)
}
/* END get customer orders */

/* START get account info */
async function getMyAccountInfo() {
    return await userService.getMyAccountInfo()
}

function* dispatchGetMyAccountInfo() {
    // console.log(action)
    const response = yield call(getMyAccountInfo)
    // console.log(response)
    if (response.data.success) {
        yield put({
            type: actions.FETCH_MY_ACCOUNT_INFO_SUCCESS,
            myAccount: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.FETCH_MY_ACCOUNT_INFO_FAILED,
            msg: response.data.msg
        })
    }
}

export function* listenGetMyAccountInfo() {
    yield takeLatest(actions.GET_MY_ACCOUNT_INFO, dispatchGetMyAccountInfo)
}
/* END get account info */

/* START get account info */
async function updateMyAccountInfo(updatedData) {
    return await userService.updateMyAccountInfo(updatedData)
}

function* dispatchUpdateMyAccountInfo(action) {
    // console.log(action)
    const response = yield call(updateMyAccountInfo, action.payload)
    // console.log(response)
    if (response.data.success) {
        yield put({
            type: actions.UPDATE_MY_ACCOUNT_SUCCESS,
            myAccount: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.UPDATE_MY_ACCOUNT_SUCCESS,
            msg: response.data.msg
        })
    }
}

export function* listenUpdateMyAccountInfo() {
    yield takeLatest(actions.UPDATE_MY_ACCOUNT, dispatchUpdateMyAccountInfo)
}
/* END get account info */