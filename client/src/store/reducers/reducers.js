import { combineReducers } from 'redux'
import { productReducer } from './product.reducer'
import { orderReducer } from './order.reducer'
import { categoryReducer } from './category.reducer'
import { cartReducer } from './cart.reducer'
import { checkoutReducer } from './checkout.reducer'
import { userReducer } from './user.reducer'
import { manufacturerReducer } from './manufacturer.reducer'
import { vendorReducer } from './vendor.reducer'

export const rootReducer = combineReducers({
    products: productReducer,
    orders: orderReducer,
    categories: categoryReducer,
    carts: cartReducer,
    checkout: checkoutReducer,
    user: userReducer,
    manufacturers: manufacturerReducer,
    vendors: vendorReducer
})