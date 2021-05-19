const express = require('express')
const vendor = require('./vendor')
const manufacturer = require('./manufacturer')
const router = express.Router()

router.use('/', vendor)
router.use('/', manufacturer)

module.exports = router