const ResponseFactory = require('../../util/ResponseFactory');
const DAO = require('../dao');
const responseFactory = new ResponseFactory()

class VendorController extends DAO {
    updateVendorStatus = async (req, res) => {
        try {
            const id = req.params.id
            const updatedData = req.body
            if (id) {
                const record = await this.model.update(updatedData, { where: { [this.id]: id } })
                if (record) {
                    res.status(200).send(responseFactory.createResponse({ data: record, type: 'update_200' }).response())
                }
            } else {
                res.status(200).send(responseFactory.createResponse({ data: record, type: 'update_400' }).response())
            }
        } catch (e) {
            res.status(500).send(responseFactory.createResponse({ data: record, type: 'error_500', msg: e.message }).response())
        }
    }
}

module.exports = VendorController