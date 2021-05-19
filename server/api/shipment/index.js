const express = require('express');
const DAO = require('../dao');
const ShippingMethodDAOExtended = require('./controller')
const shipmentDaoObject = new DAO('shipment')
const shippingMethodDaoObject = new ShippingMethodDAOExtended('shipping_methods')

const router = express.Router()

router.get('/shipping-methods/carrier', shippingMethodDaoObject.getShippingMethodsByCarrier)
router.get('/shipping-methods/:id', shippingMethodDaoObject.getOneRecord)
router.get('/shipping-methods', shippingMethodDaoObject.getAllRecords)
router.post('/shipping-methods', shippingMethodDaoObject.createRecord)
router.put('/shipping-methods/:id', shippingMethodDaoObject.updateRecord)
router.delete('/shipping-methods/:id', shippingMethodDaoObject.deleteRecord)

router.get('/shipment/:id', shipmentDaoObject.getOneRecord)
router.get('/shipment', shipmentDaoObject.getAllRecords)
router.post('/shipment', shipmentDaoObject.createRecord)
router.put('/shipment/:id', shipmentDaoObject.updateRecord)
router.delete('/shipment/:id', shipmentDaoObject.deleteRecord)

module.exports = router