const { db, sequelize } = require('../../models/db');
const ResponseFactoryClass = require('../../util/ResponseFactory');
const ResponseFactory = new ResponseFactoryClass()
const DAO = require('../dao');
const { jwtVerify } = require('../../middleware/auth')

class OrderController extends DAO {
    constructor(modelName) {
        super(modelName)
    }

    getCustomerOrders = async (req, res) => {
        const userData = await jwtVerify(req.headers.authorization)
        const id = req.params.id
        let where = { [this.id]: id }

        if (userData.role === 'customer') {
            where = { customer_id: userData.id }
        }

        console.log('[getCustomerOrders]', where)

        try {
            if (id || userData.id) {
                const records = await this.model.findAll({ where: where })
                if (records !== null) {
                    res.status(200).send(ResponseFactory.createResponse({ data: records, type: 'records_200' }).response())
                } else {
                    res.status(400).send(ResponseFactory.createResponse({ type: 'records_400' }).response())
                }
            } else {
                res.status(400).send(ResponseFactory.createResponse({ type: 'records_400' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }

    createOrder = async (req, res) => {
        try {
            const recordData = req.body
            await sequelize.transaction(async (orderCreateTransaction) => {
                const { address, checkout, cart } = recordData

                const addressRecord = await db.address.create(address, { transaction: orderCreateTransaction })

                let grandTotal = 0

                let orderItems = cart.products.map((product) => {
                    grandTotal += parseFloat(product.qty) * parseFloat(product.base_price)
                    return {
                        product_id: product.id,
                        sku: product.sku,
                        price: product.base_price,
                        qty: product.qty,
                        subtotal: parseFloat(product.qty) * parseFloat(product.base_price)
                    }
                })

                const orderCount = await this.model.count()

                const orderRecordData = {
                    increment_id: `1002021${orderCount + 1}`,
                    customer_id: address.customer_id,
                    shipping_address: addressRecord.id,
                    billing_address: addressRecord.id,
                    status: 'processing',
                    total: grandTotal,
                    tax: cart.tax,
                    due: 0,
                    paid: grandTotal,
                    shipping_amount: checkout.rate,
                    payment_method: checkout.shippingCode,
                    shipping_method: checkout.paymentMethod
                }

                // console.log(orderRecordData)


                const orderRecord = await this.model.create(orderRecordData, { transaction: orderCreateTransaction })

                orderItems = orderItems.map((item) => {
                    item.order_id = orderRecord.id
                    return item
                })

                console.log(orderItems)

                const orderItemRecords = await db.order_items.bulkCreate(orderItems, { transaction: orderCreateTransaction })

                const shipmentRecordData = {
                    shipping_method: checkout.method_id
                }

                const shipmentRecord = await db.shipment.create(shipmentRecordData, { transaction: orderCreateTransaction })

                const shipmentOrderRecordData = { shipment_id: shipmentRecord.id, order_id: orderRecord.id }
                const shipmentOrderRecord = await db.shipment_orders.create(shipmentOrderRecordData, { transaction: orderCreateTransaction })

                const shipmentItems = orderItemRecords.map((item) => {
                    return { shipment_order_id: shipmentOrderRecord.id, item_id: item.item_id, status: 'in-transit' }
                })

                const shipmentItemsRecords = await db.shipment_items.bulkCreate(shipmentItems, { transaction: orderCreateTransaction })
                res.status(200).send(ResponseFactory.createResponse({ data: orderRecord.increment_id, type: 'order_200' }).response())

            })
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ type: 'error_500', msg: e.message }).response())
        }
    }
}

module.exports = OrderController