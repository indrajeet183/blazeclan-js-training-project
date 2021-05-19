import { takeLatest, call, put } from 'redux-saga/effects'
import actions from '../actions/actions'
import ProductService from '../../services/product'

const productService = new ProductService()


/* START get products */
async function getProduct() {
    return await productService.getProducts()
}

async function getProductByCatId(catId) {
    return await productService.getProductByCatId(catId)
}

async function getProductByCatIdAndSubId(catId, subId) {
    return await productService.getProductByCatIdAndSubId(catId, subId)
}

function* dispatchGetProducts(action) {

    const { catId, subId } = action
    // console.log('action', action)
    let response = null
    if (catId && !subId) {
        response = yield call(getProductByCatId, catId)
    } else if (catId && subId) {
        response = yield call(getProductByCatIdAndSubId, catId, subId)
    } else {
        response = yield call(getProduct)
    }

    if (response.data.success) {
        yield put({
            type: actions.FETCH_PRODUCT_SUCCESS,
            products: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.FETCH_PRODUCT_FAILED,
            msg: response.data.msg
        })
    }
}


export function* listenGetProducts() {
    yield takeLatest([actions.GET_PRODUCTS, actions.GET_PRODUCTS_BY_CATEGORY_ID, actions.GET_PRODUCTS_BY_CATEGORY_ID_AND_SUB_ID], dispatchGetProducts)
}

/* END get products */

/* START add product */
async function addProduct(product) {
    const result = await productService.createProduct(product)
    return result
}

function* dispatchAddProduct(action) {
    const response = yield call(addProduct, action.payload)
    if (response.data.success) {
        yield put({
            type: actions.ADD_PRODUCT_SUCCESS,
            products: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.ADD_PRODUCT_FAILED,
            msg: response.data.msg
        })
    }
}

export function* listenAddProduct() {
    yield takeLatest(actions.ADD_PRODUCT, dispatchAddProduct)
}
/* END add product */

/* START update product */
async function updateProduct(product) {
    const result = await productService.createProduct(product)
    return result
}

function* dispatchUpdateProduct(action) {
    try {
        const response = yield call(updateProduct, action.payload)
        if (response.data.success) {
            yield put({
                type: actions.UPDATE_PRODUCT_SUCCESS,
                products: response.data.data,
                msg: response.data.msg
            })
        } else {
            yield put({
                type: actions.UPDATE_PRODUCT_FAILED,
                msg: response.data.msg
            })
        }
    } catch (e) {
        yield put({
            type: actions.UPDATE_PRODUCT_FAILED,
            msg: e.message
        })
    }
}

export function* listenUpdateProduct() {
    yield takeLatest(actions.UPDATE_PRODUCT, dispatchUpdateProduct)
}
/* END update product */

/* START add product */
async function getProductById(id) {
    return await productService.getProductById(id)
}

function* dispatchGetProductById(action) {
    console.log(action)
    const response = yield call(getProductById, action.id)
    console.log(response)
    if (response.data.success) {
        yield put({
            type: actions.FETCH_PRODUCT_BY_ID_SUCCESS,
            product: response.data.data,
            msg: response.data.msg
        })
    } else {
        yield put({
            type: actions.FETCH_PRODUCT_BY_ID_FAILED,
            msg: response.data.msg
        })
    }
}

export function* listenGetProductById() {
    console.log('listenGetProductById')
    yield takeLatest(actions.GET_PRODUCT_BY_ID, dispatchGetProductById)
}
/* END add product */

/* START add product */
async function searchProducts(searchText) {
    return await productService.searchProducts(searchText)
}

function* dispatchSearchProducts(action) {
    // console.log(action) 

    if (action.searchText.length > 0) {
        const response = yield call(searchProducts, action.searchText)
        // console.log(response)
        if (response.data.success) {
            yield put({
                type: actions.SEARCH_PRODUCT_SUCCESS,
                products: response.data.data,
                msg: response.data.msg
            })
        } else {
            yield put({
                type: actions.SEARCH_PRODUCT_FAILED,
                msg: response.data.msg
            })
        }
    } else {
        yield put({
            type: actions.SEARCH_PRODUCT_SUCCESS,
            noSearch: true
        })
    }


}

export function* listenSearchProducts() {
    console.log('listenGetProductById')
    yield takeLatest(actions.SEARCH_PRODUCT, dispatchSearchProducts)
}
/* END add product */