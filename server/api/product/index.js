const express = require('express');
const ProductDAO = require('./controller');
const productDaoObject = new ProductDAO('products')
const { auth } = require('../../middleware/auth')
const router = express.Router()

router.get('/product/search', productDaoObject.searchProduct)
router.get('/product/:id', productDaoObject.getOneRecord)
router.get('/product/cat/:id/:subId', productDaoObject.getProductByCategoryIDAndSubCategoryId)
router.get('/product/cat/:id', productDaoObject.getProductByCategoryId)
router.get('/product', productDaoObject.getAllRecords)

router.use(auth)

router.post('/product', productDaoObject.createRecord)
router.put('/product/:id', productDaoObject.updateRecord)
router.delete('/product/:id', productDaoObject.deleteRecord)

module.exports = router