const express = require('express');
const DAO = require('../dao');
const customerDaoObject = new DAO('customer')
const addressDaoObject = new DAO('address')

const router = express.Router()

router.get('/address/:id', addressDaoObject.getOneRecord)
router.get('/address', addressDaoObject.getAllRecords)
router.post('/address', addressDaoObject.createRecord)
router.put('/address/:id', addressDaoObject.updateRecord)
router.put('/address/:id', addressDaoObject.deleteRecord)

router.get('/customer/:id', customerDaoObject.getOneRecord)
router.get('/customer/', customerDaoObject.getAllRecords)
router.post('/customer/', customerDaoObject.createRecord)
router.put('/customer/:id', customerDaoObject.updateRecord)
router.delete('/customer/:id', customerDaoObject.deleteRecord)

module.exports = router