import * as actions from '../actions/products.actions'

const initialState = {
    products: [],
    productMain: false,
    filteredProducts: [],
    selectedProducts: {},
    searchText: "",
    result: {}
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        // case actions.UPDATE_PRODUCTS: {

        // }

        // case actions.DELETE_PRODUCTS: {

        // }

        case actions.SEARCH_PRODUCT_SUCCESS: {
            // console.log(action.searchText)
            let result = state.products
            if (!action.hasOwnProperty('noSearch')) result = action.products
            return {
                ...state,
                filteredProducts: result
            }
        }

        case actions.FETCH_PRODUCT_BY_ID_SUCCESS: {
            return {
                ...state,
                productMain: action.product
            }
        }

        case actions.FETCH_PRODUCT_SUCCESS: {
            // console.log('FETCH_PRODUCT_SUCCESS', action)
            return {
                ...state,
                products: action.products,
                result: {
                    sucess: true,
                    msg: action.msg
                }
            }
        }

        case actions.FETCH_PRODUCT_FAILED: {
            return {
                ...state,
                result: {
                    sucess: false,
                    msg: action.msg
                }
            }
        }

        case actions.ADD_PRODUCT_SUCCESS: {
            return {
                ...state,
                result: {
                    record: action.product,
                    sucess: true,
                    msg: action.msg
                }
            }
        }

        case actions.ADD_PRODUCT_FAILED: {
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

