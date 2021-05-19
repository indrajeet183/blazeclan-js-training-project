const express = require('express');
const DAO = require('../dao');
const orderDaoObject = new DAO('orders')
const OrderExtended = require('./controller')
const orderExtended = new OrderExtended('orders')
const orderItemsDaoObject = new DAO('order_items', "item_id")
const { auth } = require('../../middleware/auth')

const router = express.Router()


router.post('/order/place', orderExtended.createOrder)


router.use(auth)
router.get('/order/customer', orderExtended.getCustomerOrders)
router.get('/order/:id', orderDaoObject.getOneRecord)
router.get('/order-item/:id', orderItemsDaoObject.getOneRecord)
router.get('/order-item', orderItemsDaoObject.getAllRecords)
router.get('/order', orderDaoObject.getAllRecords)

router.post('/order-item', orderItemsDaoObject.createRecord)
router.put('/order-item/:id', orderItemsDaoObject.updateRecord)
router.put('/order-item/:id', orderItemsDaoObject.deleteRecord)

router.post('/order', orderDaoObject.createRecord)
router.put('/order/:id', orderDaoObject.updateRecord)
router.delete('/order/:id', orderDaoObject.deleteRecord)

module.exports = router