const express = require('express');
const DAO = require('../dao');
const produtDaoObject = new DAO('payment')
const paymentMethodsDaoObject = new DAO('payment_methods')

const router = express.Router()

router.get('/payment_methods/:id', paymentMethodsDaoObject.getOneRecord)
router.get('/payment_methods', paymentMethodsDaoObject.getAllRecords)
router.post('/payment_methods', paymentMethodsDaoObject.createRecord)
router.put('/payment_methods/:id', paymentMethodsDaoObject.updateRecord)
router.put('/payment_methods/:id', paymentMethodsDaoObject.deleteRecord)

router.get('/payment/:id', produtDaoObject.getOneRecord)
router.get('/payment/', produtDaoObject.getAllRecords)
router.post('/payment/', produtDaoObject.createRecord)
router.put('/payment/:id', produtDaoObject.updateRecord)
router.delete('/payment/:id', produtDaoObject.deleteRecord)

module.exports = router