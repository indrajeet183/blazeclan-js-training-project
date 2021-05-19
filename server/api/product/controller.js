const ResponseFactoryClass = require('../../util/ResponseFactory');
const DAO = require('../dao');
const ResponseFactory = new ResponseFactoryClass()
const upload = require('../../middleware/storage')
const { db, sequelize } = require('../../models/db')
const Validator = require('../../util/Validator')
const fs = require('fs').promises;
const { Op } = require("sequelize");
const { jwtVerify } = require('../../middleware/auth')

class ProductDAOExtended extends DAO {
    constructor(modelName) {
        super(modelName)
    }

    searchProduct = async (req, res) => {

        const searchText = req.query.query
        // console.log(searchText)

        try {
            const attributes = this.model.rawAttributes
            const fields = Object.keys(attributes)
            let filter = {}
            fields.forEach((field) => {
                if (!attributes[field].autoIncrement) {
                    const className = attributes[field].type.constructor.name
                    if (className === 'STRING' || className === 'TEXT') {
                        filter[field] = { [Op.like]: `%${searchText}%` }
                    }
                }
            })

            const records = await this.model.findAll({
                where: {
                    [Op.or]: filter
                },
                include: [{ model: db.product_images, as: 'product_images' }], order: [
                    ['id', 'ASC']]
            })

            if (records !== null) {
                res.status(200).send(ResponseFactory.createResponse({ data: records, type: 'records_200' }).response())
            } else {
                res.status(400).send(ResponseFactory.createResponse({ type: 'records_400' }).response())
            }
        } catch (e) {
            return res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

    getProductByCategoryId = async (req, res) => {
        try {
            const id = req.params.id
            console.log('[getProductByCategoryId]')
            const records = await this.model.findAll({
                include: [{
                    model: db.category_products, as: 'category_products', required: true,
                    include: [{ model: db.category, as: 'category', where: { id: id } }]
                }, { model: db.product_images, as: 'product_images' }]
            })


            if (records !== null) {
                return res.status(200).send(ResponseFactory.createResponse({ data: records, type: 'records_200' }).response())
            } else {
                return res.status(400).send(ResponseFactory.createResponse({ data: records, type: 'records_400' }).response())
            }

        } catch (e) {
            return res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

    getProductByCategoryIDAndSubCategoryId = async (req, res) => {
        try {
            console.log('[getProductByCategoryIDAndSubCategoryId]')
            const id = req.params.id
            const subId = req.params.subId
            const records = await this.model.findAll({
                include: [{
                    model: db.category_products, as: 'category_products', required: true,
                    include: [{ model: db.category, as: 'category', where: { parent_id: id, id: subId } }]
                }, { model: db.product_images, as: 'product_images' }]
            })

            if (records !== null) {
                return res.status(200).send(ResponseFactory.createResponse({ data: records, type: 'records_200' }).response())
            } else {
                return res.status(400).send(ResponseFactory.createResponse({ data: records, type: 'records_400' }).response())
            }

        } catch (e) {
            return res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

    createRecord = async (req, res) => {
        await upload(req, res)
        if (req.files.length <= 0) {
            return res.status(400).send(ResponseFactory.createResponse({ type: 'files_400' }).response())
        } else {
            try {
                const recordData = JSON.parse(req.body['product-data'])
                const validator = new Validator()
                const validationResult = validator.validate(this.model, recordData)

                if (validationResult) {
                    await sequelize.transaction(async (productSaveTransaction) => {
                        const record = await this.model.create(recordData, { transaction: productSaveTransaction })

                        const imagesData = req.files.map(file => {
                            return {
                                product_id: record.id,
                                image_path: file.path,
                                name: file.originalname,
                                mimetype: file.mimetype,
                                size: file.size
                            }
                        })

                        const images = await db.product_images.bulkCreate(imagesData, { transaction: productSaveTransaction })
                        // console.log(record.count)
                        // console.log(images.count)

                        if (record) {
                            return res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'create_200' }).response())
                        } else {
                            await rollbackAndDeleteFiles(req.files)
                            return res.status(400).send(ResponseFactory.createResponse({ data: record, type: 'create_400' }).response())
                        }
                    })
                } else {
                    await rollbackAndDeleteFiles(req.files)
                    res.status(400).send(ResponseFactory.createResponse({ data: validator.getErrorMessage(), type: 'create_400' }).response())
                }

            } catch (error) {
                await rollbackAndDeleteFiles(req.files)
                return res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: 'adasdad' + error.message }).response())
            }
        }
    }

    updateRecord = async (req, res) => {
        await upload(req, res)
        if (req.files.length <= 0) {
            return res.status(400).send(ResponseFactory.createResponse({ type: 'files_400' }).response())
        } else {
            try {
                const recordData = JSON.parse(req.body['product-data'])
                const validator = new Validator()
                const validationResult = validator.validate(this.model, recordData)

                if (validationResult) {
                    await sequelize.transaction(async (productSaveTransaction) => {
                        const record = await this.model.update(recordData, {
                            where: { id: recordData.id },
                            transaction: productSaveTransaction
                        })

                        const imagesData = req.files.map(file => {
                            return {
                                product_id: record.id,
                                image_path: file.path,
                                name: file.originalname,
                                mimetype: file.mimetype,
                                size: file.size
                            }
                        })

                        await db.product_images.bulkCreate(imagesData, { transaction: productSaveTransaction })

                        if (record) {
                            return res.status(200).send(ResponseFactory.createResponse({ data: record, type: 'create_200' }).response())
                        } else {
                            await rollbackAndDeleteFiles(req.files)
                            return res.status(400).send(ResponseFactory.createResponse({ data: record, type: 'create_400' }).response())
                        }
                    })
                } else {
                    await rollbackAndDeleteFiles(req.files)
                    res.status(400).send(ResponseFactory.createResponse({ data: validator.getErrorMessage(), type: 'create_400' }).response())
                }

            } catch (error) {
                await rollbackAndDeleteFiles(req.files)
                return res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: 'adasdad' + error.message }).response())
            }
        }
    }

    getAllRecords = async (req, res) => {
        const userData = await jwtVerify(req.headers.authorization)

        let includes = [{ model: db.product_images, as: 'product_images' }]

        console.log(userData)

        if (userData.role === 'vendor') {
            includes.push({
                model: db.vendor_products, as: "vendor_products", required: true,
                include: [{ model: db.vendor, as: 'vendor', where: { user: userData.id } }]
            })
        }
        console.log(includes)
        try {
            const records = await this.model.findAll({
                include: includes,
                order: [['id', 'ASC']]
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

    getOneRecord = async (req, res) => {
        try {
            const id = req.params.id
            if (id) {
                const record = await this.model.findOne({ where: { [this.id]: id }, include: [{ model: db.product_images, as: 'product_images' }] })
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
}

const rollbackAndDeleteFiles = async (images) => {
    images.forEach(async (image) => {
        try {
            await fs.unlink(image.path);
        } catch (e) {
            console.log(e.message);
        }
    })

}

module.exports = ProductDAOExtended