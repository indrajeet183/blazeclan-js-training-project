const express = require('express');
const DAO = require('../dao');
const UserExtendedDAO = require('./controller')
const userExtendedDAO = new UserExtendedDAO('users')
const roleDaoObject = new DAO('role')
const { login, auth } = require('../../middleware/auth')

const router = express.Router()

router.post('/user/signup', userExtendedDAO.createRecord)
router.post('/user/login', login)

router.use(auth)
router.get('/user/:id?', userExtendedDAO.getOneRecord)
router.get('/users', userExtendedDAO.getAllRecords)
router.put('/user/:id?', userExtendedDAO.updateRecord)
router.delete('/user/:id', userExtendedDAO.deleteRecord)

router.get('/role/:id', roleDaoObject.getOneRecord)
router.get('/role/', roleDaoObject.getAllRecords)
router.post('/role/', roleDaoObject.createRecord)
router.put('/role/:id', roleDaoObject.updateRecord)
router.delete('/role/:id', roleDaoObject.deleteRecord)


module.exports = router