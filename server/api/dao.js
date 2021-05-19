const { db } = require('../models/db')
const ResponseFactoryClass = require('../util/ResponseFactory')
const ResponseFactory = new ResponseFactoryClass()
const Validator = require('../util/Validator')
/**
 * Class reperesnt the Generic Data Acceess Object 
 */
class DAO {
    /**
     * @param {string} modelName - sequalize model name
     * @param {string} id - uniqueue idenntifier for mode/table for where condition
     */
    constructor(modelName, id = "id") {
        this.model = db[modelName]
        this.id = id
    }

    /**
     * Get list of records for specified model 
     */
    getAllRecords = async (req, res) => {
        try {
            const records = await this.model.findAll()
            if (records) {
                res.status(200).send(ResponseFactory.createResponse({ data: records, type: 'records_200' }).response())
            } else {
                res.status(400).send(ResponseFactory.createResponse({ data: records, type: 'records_400' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

    /**
     * Get a single record for specified model by unique idenntifier
     */
    getOneRecord = async (req, res) => {
        try {
            const id = req.params.id
            if (id) {
                const record = await this.model.findOne({ where: { [this.id]: id } })
                if (record) {
                    res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'record_200' }).response())
                } else {
                    res.status(400).send(ResponseFactory.createResponse({ data: record, type: 'record_id_not_found_400' }).response())
                }
            } else {
                res.status(400).send(ResponseFactory.createResponse({ type: 'record_400' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

    /**
     * Create a single record for specified model
     */
    createRecord = async (req, res) => {
        try {
            const recordData = req.body
            const validator = new Validator()
            const validationResult = validator.validate(this.model, recordData)
            if (validationResult) {
                const record = await this.model.create(recordData)
                if (record) {
                    res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'create_200' }).response())
                } else {
                    res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'create_400' }).response())
                }
            } else {
                res.status(400).send(ResponseFactory.createResponse({ data: validator.getErrorMessage(), type: 'create_400' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ data: record, type: 'error_500', msg: e.message }).response())
        }
    }

    /**
     * Update a single record for specified model by unique idenntifier
     */
    updateRecord = async (req, res) => {
        try {
            const id = req.params.id
            const updatedData = req.body
            if (id) {
                const record = await this.model.update(updatedData, { where: { [this.id]: id } })
                if (record) {
                    res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'update_200' }).response())
                }
            } else {
                res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'update_400' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ data: record, type: 'error_500', msg: e.message }).response())
        }
    }

    /**
     * Delete single record for specified model by unique idenntifier
     */
    deleteRecord = async (req, res) => {
        try {
            const id = req.params.id

            if (id) {
                const record = await this.model.destroy({ where: { [this.id]: id } })
                if (record) {
                    res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'delete_200' }).response())
                }
            } else {
                res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'delete_400' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }
}

module.exports = DAO