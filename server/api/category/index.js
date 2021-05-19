const express = require('express');
const DAO = require('../dao');
const CategoryDAOExtended = require('./controller')
const categoryDaoObject = new CategoryDAOExtended('category')
const subCategoryExtendedDAO = new CategoryDAOExtended('sub_category')
const { auth } = require('../../middleware/auth')

const router = express.Router()

router.get('/category/:id', categoryDaoObject.getOneRecord)
router.get('/category', categoryDaoObject.getAllRecords)

router.get('/sub-category/:id', subCategoryExtendedDAO.getOneRecord)
router.get('/sub-category', subCategoryExtendedDAO.getAllRecords)

router.use(auth)

router.post('/sub-category', subCategoryExtendedDAO.createRecord)
router.put('/sub-category/:id', subCategoryExtendedDAO.updateRecord)
router.delete('/sub-category/:id', subCategoryExtendedDAO.deleteRecord)

router.post('/category', categoryDaoObject.createRecord)
router.put('/category/:id', categoryDaoObject.updateRecord)
router.delete('/category/:id', categoryDaoObject.deleteRecord)

module.exports = router