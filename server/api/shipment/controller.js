const DAO = require('../dao')
const ResponseFactoryClass = require('../../util/ResponseFactory');
const ResponseFactory = new ResponseFactoryClass()

class ShippingMethodDAOExtended extends DAO {
    constructor(modelName) {
        super(modelName)
    }

    getShippingMethodsByCarrier = async (req, res) => {
        try {
            const records = await this.model.findAll()
            if (records !== null) {
                let result = records.reduce((acc, next) => {
                    if (!acc.hasOwnProperty(next.carrier)) {
                        acc[next.carrier] = []
                    }

                    acc[next.carrier].push(next)
                    return acc
                }, {})
                return res.status(200).send(ResponseFactory.createResponse({ data: result, type: 'records_200' }).response())
            }
            return res.status(400).send(ResponseFactory.createResponse({ data: records, type: 'records_400' }).response())
        } catch (e) {
            return res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }
}

module.exports = ShippingMethodDAOExtended;