import * as actions from '../actions/orders.actions'

const initialState = {
    orders: [],
    filteredOrders: [],
    selectedOrders: {},
    searchText: "",
    result: {},
    success: false,
    success_increment_id: ""
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        // case actions.UPDATE_ORDERS: {

        // }

        // case actions.DELETE_ORDERS: {

        // }

        case 'FORCELOGOUT': {
            return state
        }

        case actions.SEARCH_ORDER: {
            console.log(action.searchText)
            return {
                ...state,
                filteredOrders: [...state.orders.filter((order) => {
                    return Object.keys(order).map((field) => {
                        if (typeof order[field] === 'string') {
                            return order[field].toLowerCase().includes(action.searchText.toLowerCase())
                        }
                    }).includes(true)
                })]
            }
        }

        case actions.FETCH_ORDER_SUCCESS: {
            console.log('FETCH_ORDER_SUCCESS', action)
            return {
                ...state,
                orders: action.orders,
                result: {
                    sucess: true,
                    msg: action.msg
                }
            }
        }

        case actions.FETCH_ORDER_FAILED: {
            return {
                ...state,
                result: {
                    sucess: false,
                    msg: action.msg
                }
            }
        }

        case actions.RESET_ORDER: {
            return initialState
        }

        case actions.ADD_ORDER_SUCCESS: {
            return {
                ...state,
                success_increment_id: action.order,
                success: true
            }
        }

        case actions.ADD_ORDER_FAILED: {
            return {
                ...state,
                result: {
                    sucess: false,
                    msg: action.msg
                }
            }
        }

        default: {
            return state
        }
    }
}

