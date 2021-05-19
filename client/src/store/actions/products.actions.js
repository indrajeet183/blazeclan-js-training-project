export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const GET_PRODUCTS_BY_CATEGORY_ID = 'GET_PRODUCTS_BY_CATEGORY_ID'
export const GET_PRODUCTS_BY_CATEGORY_ID_AND_SUB_ID = 'GET_PRODUCTS_BY_CATEGORY_ID_AND_SUB_ID'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCTS'
export const DELETE_PRODUCT = 'DELETE_PRODUCTS'
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS"
export const FETCH_PRODUCT_FAILED = "FETCH_PRODUCT_FAILED"
export const SEARCH_PRODUCT_SUCCESS = "SEARCH_PRODUCT_SUCCESS"
export const SEARCH_PRODUCT_FAILED = "SEARCH_PRODUCT_FAILED"
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS"
export const ADD_PRODUCT_FAILED = "ADD_PRODUCT_FAILED"
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS"
export const UPDATEPRODUCT_FAILED = "UPDATE_PRODUCT_FAILED"
export const FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS"
export const FETCH_PRODUCT_BY_ID_FAILED = "FETCH_PRODUCT_BY_ID_FAILED"


export const getProducts = () => {
    return {
        type: GET_PRODUCTS
    }
}

export const getProductById = (id) => {
    return {
        type: GET_PRODUCT_BY_ID,
        id
    }
}

export const addProduct = (data) => {
    return {
        type: ADD_PRODUCT,
        payload: data
    }
}


export const updateProduct = (updatedData, id) => {
    return {
        type: UPDATE_PRODUCT,
        payload: updatedData,
        id
    }
}


export const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        id
    }
}

export const searchProducts = (keyword) => {
    return {
        type: SEARCH_PRODUCT,
        searchText: keyword
    }
}

export const getProductsByCategoryId = (catId) => {
    return {
        type: GET_PRODUCTS_BY_CATEGORY_ID,
        catId
    }
}

export const getProductsByCategoryIdAndSubCategoryId = (catId, subId) => {
    return {
        type: GET_PRODUCTS_BY_CATEGORY_ID_AND_SUB_ID,
        catId,
        subId
    }
}