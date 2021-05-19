export const GET_ORDERS = 'GET_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDERS'
export const DELETE_ORDER = 'DELETE_ORDERS'
export const SEARCH_ORDER = 'SEARCH_ORDER'
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS"
export const FETCH_ORDER_FAILED = "FETCH_ORDER_FAILED"
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS"
export const ADD_ORDER_FAILED = "ADD_ORDER_FAILED"
export const RESET_ORDER = 'RESET_ORDER'


export const getOrders = () => {
    return {
        type: GET_ORDERS
    }
}


export const addOrder = (data) => {
    return {
        type: ADD_ORDER,
        data
    }
}


export const updateOrder = (updatedData, id) => {
    return {
        type: UPDATE_ORDER,
        id,
        payload: updatedData
    }
}


export const deleteOrder = (id) => {
    return {
        type: DELETE_ORDER,
        id
    }
}

export const searchOrders = (keyword) => {
    return {
        type: SEARCH_ORDER,
        searchText: keyword
    }
}

export const resetOrder = () => {
    return {
        type: RESET_ORDER
    }
}