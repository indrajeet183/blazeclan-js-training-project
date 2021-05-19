import actions from '../actions/actions'

const initialState = {
    shipping_carriers: [],
    shipping_methods: {},
    payment_methods: [],
    checkoutData: false
}

export const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.UPDATE_CHECKOUT_DATA: {
            return {
                ...state,
                checkoutData: action.data
            }
        }

        case actions.FETCH_PAYMENT_METHODS_SUCCESS: {
            return {
                ...state,
                payment_methods: action.payment_methods
            }
        }

        case actions.FETCH_SHIPPING_METHODS_BY_CARRIER_SUCCESS: {
            return {
                ...state,
                shipping_carriers: [...Object.keys(action.shipping_methods)],
                shipping_methods: action.shipping_methods
            }
        }

        case actions.RESET_CHECKOUT: {
            return initialState
        }

        default: {
            return state
        }
    }
}