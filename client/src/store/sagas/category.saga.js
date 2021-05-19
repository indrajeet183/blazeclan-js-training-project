import { takeLatest, call, put } from 'redux-saga/effects'
import actions from '../actions/actions'
import CategoryService from '../../services/category/category'

const categoryService = new CategoryService()


/* START get categories */
async function getCategory() {
    const result = await categoryService.getCategories()
    return result
}

function* dispatchGetCategories() {
    const response = yield call(getCategory)
    // console.log(response)
    if (response.data.success) {
        yield put({
            type: actions.FETCH_CATEGORY_SUCCESS,
            categories: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.FETCH_CATEGORY_FAILED,
            msg: response.data.msg
        })
    }
}

export function* listenGetCategories() {
    yield takeLatest(actions.GET_CATEGORIES, dispatchGetCategories)
}
/* END get categories */

/* START add category */
async function addCategory(category) {
    const result = await categoryService.createCategory(category)
    return result
}

function* dispatchAddCategory(action) {
    const response = yield call(addCategory, action.payload)
    if (response.data.success) {
        yield put({
            type: actions.ADD_CATEGORY_SUCCESS,
            categories: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.ADD_CATEGORY_FAILED,
            msg: response.data.msg
        })
    }
}

export function* listenAddCategory() {
    yield takeLatest(actions.ADD_CATEGORY, dispatchAddCategory)
}
/* END add category */