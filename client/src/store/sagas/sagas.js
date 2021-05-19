import { all } from 'redux-saga/effects'
import { listenGetProducts, listenAddProduct, listenGetProductById, listenSearchProducts } from './product.saga'
import { listenCreateOrder } from './order.saga'
import { listenGetCategories, listenAddCategory } from './category.saga'
import { listenGetPaymentMethods, listenGetShippingMethodsByCarrier } from './checkout.saga'
import { listenGetManufacturer } from './manufacturer.saga'
import { listenGetVendors, listenUpdateVendorStatus } from './vendor.saga'
import { listenGetOrdersByCustomer, listenGetMyAccountInfo, listenUpdateMyAccountInfo } from './user.saga'

export default function* rootSaga() {
    yield all([
        listenGetProducts(),
        listenAddProduct(),
        listenGetProductById(),
        listenCreateOrder(),
        listenSearchProducts(),
        listenGetCategories(),
        listenAddCategory(),
        listenGetPaymentMethods(),
        listenGetShippingMethodsByCarrier(),
        listenGetManufacturer(),
        listenGetVendors(),
        listenUpdateVendorStatus(),
        listenGetOrdersByCustomer(),
        listenGetMyAccountInfo(),
        listenUpdateMyAccountInfo()
    ])
}