import * as productActions from './products.actions'
import * as orderActions from './orders.actions'
import * as categoryActions from './category.actions'
import * as cartActions from './cart.action'
import * as checkoutActions from './checkout.actions'
import * as userActions from './user.action'
import * as manufacturerActions from './manfucaturer.actions'
import * as vendorActions from './vendor.actions'

export default {
    ...productActions,
    ...orderActions,
    ...categoryActions,
    ...cartActions,
    ...checkoutActions,
    ...userActions,
    ...manufacturerActions,
    ...vendorActions
}