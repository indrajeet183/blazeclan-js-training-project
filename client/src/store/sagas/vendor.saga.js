import { takeLatest, call, put } from 'redux-saga/effects'
import actions from '../actions/actions'
import VendorService from '../../services/vendor'

const vendorService = new VendorService()

/* START get vendors */
async function getVendors() {
    return await vendorService.getVendors()
}

function* dispatchGetVendors() {
    try {
        const response = yield call(getVendors)
        if (response.data.success) {
            yield put({
                type: actions.FETCH_VENDOR_SUCCESS,
                vendors: response.data.data,
                msg: response.data.msg
            })
        } else {
            yield put({
                type: actions.FETCH_VENDOR_FAILED,
                msg: response.data.msg
            })
        }
    } catch (e) {
        yield put({
            type: actions.FETCH_VENDOR_FAILED,
            msg: e.message
        })
    }
}

export function* listenGetVendors() {
    yield takeLatest(actions.GET_VENDORS, dispatchGetVendors)
}
/* END get vendors */

/* START update vendor status */
async function updateVendorStatus(id, status) {
    return await vendorService.updateVendorStatus(id, status)
}

function* dispatchUpdateVendorStatus(action) {
    try {
        const response = yield call(updateVendorStatus, action.id, action.status)
        if (response.data.success) {
            yield put({
                type: actions.UPDATE_VENDOR_STATUS_SUCCESS,
                vendor: response.data.data,
                msg: response.data.msg,
                id: action.id,
                status: action.status
            })
        } else {
            yield put({
                type: actions.UPDATE_VENDOR_STATUS_FAILED,
                msg: response.data.msg
            })
        }
    } catch (e) {
        yield put({
            type: actions.UPDATE_VENDOR_STATUS_FAILED,
            msg: e.message
        })
    }
}

export function* listenUpdateVendorStatus() {
    yield takeLatest(actions.UPDATE_VENDOR_STATUS, dispatchUpdateVendorStatus)
}
/* END update vendor status */