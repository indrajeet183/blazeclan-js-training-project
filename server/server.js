const express = require('express')
const cors = require('cors');
const expressApp = new express()
const Api = require('./api')

expressApp.use(express.urlencoded({ extended: false }))
expressApp.use(express.json())

expressApp.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*'
}))

expressApp.use(Api)

expressApp.listen(5004, () => {
    console.log('Server listening on 5004')
})
