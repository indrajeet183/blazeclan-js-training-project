export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_USER = 'LOGOUT_USER'
export const GET_MY_ORDERS = 'GET_MY_ORDERS'
export const FETCH_MY_ORDERS_SUCCESS = 'FETCH_MY_ORDERS_SUCCESS'
export const FETCH_MY_ORDERS_FAILED = 'FETCH_MY_ORDERS_FAILED'
export const GET_MY_ACCOUNT_INFO = 'GET_MY_ACCOUNT_INFO'
export const FETCH_MY_ACCOUNT_INFO_SUCCESS = 'FETCH_MY_ACCOUNT_INFO_SUCCESS'
export const FETCH_MY_ACCOUNT_INFO_FAILED = 'FETCH_MY_ACCOUNT_INFO_FAILED'
export const UPDATE_MY_ACCOUNT = 'UPDATE_MY_ACCOUNT'
export const UPDATE_MY_ACCOUNT_SUCCESS = 'UPDATE_MY_ACCOUNT_SUCCESS'
export const UPDATE_MY_ACCOUNT_FAILED = 'UPDATE_MY_ACCOUNT_FAILED'


export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const getMyOrders = () => {
    return {
        type: GET_MY_ORDERS
    }
}

export const getMyAccountInfo = () => {
    return {
        type: GET_MY_ACCOUNT_INFO
    }
}

export const updateMyAccountInfo = (updatedData) => {
    return {
        type: UPDATE_MY_ACCOUNT,
        payload: updatedData
    }
}