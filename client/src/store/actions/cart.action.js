export const ADD_CART_ITEM = 'ADD_CART_ITEM'
export const UPDATE_CART_ITEM_QTY = 'UPDATE_CART_ITEM_QTY'
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
export const RESET_CART = 'RESET_CART'

export const addCartItem = (item) => {
    return {
        type: ADD_CART_ITEM,
        item
    }
}

export const updateCartItemQty = (id, qty) => {
    return {
        type: UPDATE_CART_ITEM_QTY,
        id,
        qty
    }
}

export const deleteCartItem = (id) => {
    return {
        type: DELETE_CART_ITEM,
        id
    }
}

export const resetCart = () => {
    return {
        type: RESET_CART
    }
}
