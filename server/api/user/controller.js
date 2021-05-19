const ResponseFactory = require('../../util/ResponseFactory');
const DAO = require('../dao');
const responseFactory = new ResponseFactory()
const { encrypt } = require('../../util/Crypto')
const Validator = require('../../util/Validator')
const { db, sequelize } = require('../../models/db');
const { jwtVerify } = require('../../middleware/auth')


class UserController extends DAO {
    createRecord = async (req, res) => {
        try {
            let recordData = req.body
            const validator = new Validator()
            const validationResult = validator.validate(this.model, recordData)

            if (validationResult) {
                await sequelize.transaction(async (userSaveTransaction) => {
                    recordData.password = encrypt(recordData.password)
                    const group = recordData.group
                    delete recordData.group
                    const record = await this.model.create(recordData, { transaction: userSaveTransaction })

                    const userRole = await db.role_users.create({
                        user_id: record.id,
                        role_id: group
                    }, { transaction: userSaveTransaction })

                    if (record && userRole) {
                        res.status(200).send(responseFactory.createResponse({ data: record, type: 'create_200' }).response())
                    } else {
                        res.status(400).send(responseFactory.createResponse({ data: record, type: 'create_400' }).response())
                    }
                })
            } else {
                res.status(400).send(responseFactory.createResponse({ data: validator.getErrorMessage(), type: 'create_400' }).response())
            }
        } catch (e) {
            res.status(500).send(responseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

    getOneRecord = async (req, res) => {
        try {
            const id = req.params.id
            const userData = await jwtVerify(req.headers.authorization)

            let where = { [this.id]: id }

            if (userData.role === 'customer') where = { [this.id]: userData.id }

            if (userData.id || id) {
                const record = await this.model.findOne({ where: where, attributes: { exclude: ['password', 'status'] } })
                if (record) {
                    res.status(200).send(responseFactory.createResponse({ data: record, type: 'record_200' }).response())
                } else {
                    res.status(400).send(responseFactory.createResponse({ data: record, type: 'record_id_not_found_400' }).response())
                }
            } else {
                res.status(400).send(responseFactory.createResponse({ type: 'record_400' }).response())
            }
        } catch (e) {
            res.status(500).send(responseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

    updateRecord = async (req, res) => {
        try {
            const id = req.params.id
            const updatedData = req.body
            const userData = await jwtVerify(req.headers.authorization)

            let where = { [this.id]: id }

            if (userData.role === 'customer') where = { [this.id]: userData.id }

            if (id || userData.id) {
                const record = await this.model.update(updatedData, { where: where })
                const findRecord = await this.model.findOne({ where: where, attributes: { exclude: ['password', 'status'] } })
                if (record.length) {
                    return res.status(200).send(responseFactory.createResponse({ data: findRecord, type: 'update_200' }).response())
                }
                return res.status(400).send(responseFactory.createResponse({ data: record, type: 'update_400' }).response())
            } else {
                res.status(400).send(responseFactory.createResponse({ type: 'update_400' }).response())
            }
        } catch (e) {
            res.status(500).send(responseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }
}

module.exports = UserController