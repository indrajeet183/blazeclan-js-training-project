import actions from '../actions/actions'

const initialState = {
    customer_id: '',
    loggedIn: false,
    myOrders: [],
    myAccount: false,
    role: '',
    roleData: {

    },
    result: {
        success: false,
        msg: ''
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.LOGIN_SUCCESS: {
            let roleData = {}
            if (action.data.role === 'vendor') roleData = { status: action.data.status }

            return {
                ...state,
                customer_id: action.data.id,
                loggedIn: action.data.success,
                role: action.data.role,
                roleData
            }
        }

        case actions.LOGOUT_USER: {
            window.sessionStorage.clear()
            return initialState
        }

        case actions.FETCH_MY_ORDERS_SUCCESS: {
            return {
                ...state,
                myOrders: action.orders,
                result: {
                    success: true,
                    msg: action.msg
                }
            }
        }

        case actions.FETCH_MY_ORDERS_FAILED: {
            return {
                ...state,
                result: {
                    success: false,
                    msg: action.msg
                }
            }
        }

        case actions.FETCH_MY_ACCOUNT_INFO_SUCCESS: {
            return {
                ...state,
                myAccount: action.myAccount,
                result: {
                    success: true,
                    msg: action.msg
                }
            }
        }

        case actions.FETCH_MY_ACCOUNT_INFO_FAILED: {
            return {
                ...state,
                result: {
                    success: false,
                    msg: action.msg
                }
            }
        }

        case actions.UPDATE_MY_ACCOUNT_SUCCESS: {
            return {
                ...state,
                myAccount: action.myAccount,
                result: {
                    success: true,
                    msg: action.msg
                }
            }
        }

        case actions.UPDATE_MY_ACCOUNT_FAILED: {
            return {
                ...state,
                result: {
                    success: false,
                    msg: action.msg
                }
            }
        }

        default: {
            return state
        }
    }
}