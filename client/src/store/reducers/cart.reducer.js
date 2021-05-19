import actions from '../actions/actions'

const initialState = {
    products: [],
    subTotal: 0,
    totalQty: 0,
    tax: 0
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.ADD_CART_ITEM: {
            let tempProducts = [...state.products]
            const foundIndex = tempProducts.findIndex(product => product.id === action.item.id)

            if (foundIndex !== -1) {
                tempProducts[foundIndex].qty = tempProducts[foundIndex].qty + action.item.qty
            } else {
                tempProducts.push(action.item)
            }

            return {
                ...state,
                products: tempProducts,
                totalQty: state.totalQty + action.item.qty,
                subTotal: state.subTotal + action.item.price,
                tax: (state.subTotal + action.item.price) * 0.05
            }
        }

        case actions.UPDATE_CART_ITEM_QTY: {
            let tempProducts = [...state.products]
            const foundIndex = tempProducts.findIndex(product => product.id === action.id)

            let qty = action.qty
            if (action.qty === 'plus') {
                qty = 1
            } else if (action.qty === 'minus') {
                qty = -1
            }

            if ((tempProducts[foundIndex].qty + qty) < 1) {
                tempProducts[foundIndex].qty = 1
                tempProducts[foundIndex].price = tempProducts[foundIndex].qty * tempProducts[foundIndex].base_price
                qty = 0
            } else {
                tempProducts[foundIndex].qty += qty
                tempProducts[foundIndex].price = tempProducts[foundIndex].qty * tempProducts[foundIndex].base_price
            }

            const subTotal = tempProducts.reduce((acc, next) => acc + next.base_price * next.qty, 0)

            return {
                ...state,
                products: tempProducts,
                totalQty: state.totalQty + qty,
                subTotal,
                tax: subTotal * 0.05
            }
        }

        case actions.DELETE_CART_ITEM: {
            let tempProducts = [...state.products]
            const foundIndex = tempProducts.findIndex(product => product.id === action.id)
            const reduceQty = tempProducts[foundIndex].qty
            tempProducts.splice(foundIndex, 1)

            const subTotal = tempProducts.reduce((acc, next) => acc + next.base_price, 0)

            return {
                ...state,
                products: tempProducts,
                totalQty: state.totalQty - reduceQty,
                subTotal,
                tax: subTotal * 0.05
            }
        }

        case actions.RESET_CART: {
            return initialState
        }

        default: {
            return state
        }
    }
}
