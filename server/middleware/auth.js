const jwt = require('jsonwebtoken')
const ResponseFactory = require('../util/ResponseFactory')
const { sendAmqpMessage } = require('../util/rmq')
const responseFactory = new ResponseFactory()
const { db } = require('../models/db')
const { decrypt } = require('../util/Crypto')

const jwtSecreteSettings = {
    jwtSecret: 'saOD/Gdaxg-dnaRq3'
};

const login = async (req, res) => {
    try {
        const user = req.body
        console.log(user)

        const result = await validateUser(user)

        if (result.success) {
            const token = jwt.sign({ user, role: result.role, id: result.id }, jwtSecreteSettings.jwtSecret, {
                expiresIn: 3600
            });

            let reqData = { token, role: result.role, id: result.id }

            if (result.hasOwnProperty('status')) reqData = { ...reqData, status: result.status }

            console.log(reqData)

            sendAmqpMessage({ email: user.email, success: true, logged_in: new Date().toISOString() })
            res.status(200).send(responseFactory.createResponse({ data: reqData, type: 'login_200' }).token())
        } else {
            sendAmqpMessage({ email: user.email, success: false, logged_in: new Date().toISOString(), msg: result.message })
            res.status(400).send(responseFactory.createResponse({ data: result, type: 'login_400', msg: result.message }).response())
        }
    } catch (e) {
        sendAmqpMessage({ email: user.email, success: false, logged_in: new Date().toISOString(), msg: e.message })
        res.status(500).send(responseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
    }
}

const auth = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization) {
        let token = req.headers.authorization.split(" ")[1];

        await jwt.verify(token, jwtSecreteSettings.jwtSecret, async (err, decode) => {
            if (err) {
                return res.status(401).send(responseFactory.createResponse({ type: 'auth_401', msg: err }).response())
            }
            req.decode = decode
            next()
        })
    } else {
        res.status(401).send(responseFactory.createResponse({ type: 'auth_401', msg: 'Please provide header!' }).response())
    }
}

const jwtVerify = async (header) => {
    let token = header.split(" ")[1];
    const data = await jwt.verify(token, jwtSecreteSettings.jwtSecret, async (err, decode) => {
        if (err) {
            return false
        }
        return decode
    })
    return data
}

const validateUser = async (user) => {
    try {
        const { email, password } = user
        const record = await db.users.findOne({ where: { email: email }, include: [{ model: db.role_users, as: 'role_users', include: { model: db.role, as: 'role' } }] })
        // console.log(record.id)

        if (record !== null && record.email.length > 0) {
            const decryptedPassword = decrypt(record.password)

            if (decryptedPassword === password) {
                const role = record.role_users[0].role.name

                if (role === 'vendor') {
                    const vendorRecord = await db.vendor.findOne({ where: { user: record.id } })
                    return {
                        role,
                        success: true,
                        id: record.id,
                        status: vendorRecord.status
                    }
                } else {
                    return {
                        role,
                        success: true,
                        id: record.id
                    }
                }
            } else {
                return {
                    success: false,
                    message: `Invalid Username or Password`
                }
            }
        } else {
            return {
                success: false,
                message: `Can not find user with email ${email}`
            }
        }
    } catch (e) {
        return {
            success: false,
            message: e.message
        }
    }
}

module.exports.login = login
module.exports.auth = auth
module.exports.jwtVerify = jwtVerify