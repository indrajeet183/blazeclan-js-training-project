const express = require('express');
const DAO = require('../dao');
const manufacturerDaoObject = new DAO('manufacturer')

const router = express.Router()

router.get('/manufacturer/:id', manufacturerDaoObject.getOneRecord)
router.get('/manufacturer', manufacturerDaoObject.getAllRecords)
router.post('/manufacturer', manufacturerDaoObject.createRecord)
router.put('/manufacturer/:id', manufacturerDaoObject.updateRecord)
router.delete('/manufacturer/:id', manufacturerDaoObject.deleteRecord)

module.exports = router