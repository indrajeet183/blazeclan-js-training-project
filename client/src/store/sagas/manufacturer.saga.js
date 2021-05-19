import { takeLatest, call, put } from 'redux-saga/effects'
import actions from '../actions/actions'
import ManufactureService from '../../services/manufacturer'

const manufacturerService = new ManufactureService()


/* START get manufacturers */
async function getManufacturer() {
    const result = await manufacturerService.getManufacturers()
    return result
}

function* dispatchGetManufacturers() {
    try {
        let response = yield call(getManufacturer)
        // console.log(response)
        if (response.data.success) {
            yield put({
                type: actions.FETCH_MANUFACTURERS_SUCCESS,
                manufacturers: response.data.data,
                msg: response.data.msg
            })
        } else {
            yield put({
                type: actions.FETCH_MANUFACTURERS_FAILED,
                msg: response.data.msg
            })
        }
    } catch (err) {
        yield put({
            type: actions.FETCH_MANUFACTURERS_FAILED,
            msg: err.response.data.msg
        })
    }
}

export function* listenGetManufacturer() {
    yield takeLatest(actions.GET_MANUFACTURERS, dispatchGetManufacturers)
}
/* END get manufacturers */