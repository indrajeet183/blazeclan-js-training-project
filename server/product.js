const express = require('express')
const cors = require('cors');
const expressApp = new express()
const Api = require('./api/product')
const path = require('path')

expressApp.use(express.urlencoded({ extended: false }))
expressApp.use(express.json())

expressApp.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*'
}))


expressApp.use('/uploads', express.static(path.join(__dirname, 'uploads')))

expressApp.use(Api)

expressApp.listen(5005, () => {
    console.log('Product Server listening on 5005')
})
