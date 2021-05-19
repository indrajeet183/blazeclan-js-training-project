const express = require('express');
const DAO = require('../dao');
const vendorDaoObject = new DAO('vendor')
const VendorExtendedDAO = require('./controller')
const vendorExtendedDAO = new VendorExtendedDAO('vendor')

const { auth } = require('../../middleware/auth')

const router = express.Router()

router.get('/vendor/:id', vendorDaoObject.getOneRecord)
router.put('/vendor/:id', vendorDaoObject.updateRecord)
router.use(auth)

router.get('/vendor', vendorDaoObject.getAllRecords)
router.post('/vendor', vendorDaoObject.createRecord)
router.patch('/vendor/:id', vendorExtendedDAO.updateVendorStatus)
router.delete('/vendor/:id', vendorDaoObject.deleteRecord)

module.exports = router