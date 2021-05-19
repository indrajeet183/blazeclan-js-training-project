const ResponseFactoryClass = require('../../util/ResponseFactory');
const DAO = require('../dao');
const { db } = require('../../models/db')
const ResponseFactory = new ResponseFactoryClass()

class CategoryDAOExtended extends DAO {
    constructor(modelName) {
        super(modelName)
    }

    getSubCategoriesByCategoryId = async (req, res) => {
        const id = req.params.id
        try {
            const result = await this.model.findAll({ where: { parent_id: id } })
            if (result) {
                res.status(200).send(ResponseFactory.createResponse({ data: records, type: 'records_200' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ data: records, type: 'error_500', msg: e.message }).response())
        }
    }

    getAllRecords = async (req, res) => {
        try {
            const records = await this.model.findAll({
                include: [{ model: db.category, as: 'categories' }]
            })
            if (records) {
                res.status(200).send(ResponseFactory.createResponse({ data: records, type: 'records_200' }).response())
            } else {
                res.status(400).send(ResponseFactory.createResponse({ data: records, type: 'records_400' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

}

module.exports = CategoryDAOExtended