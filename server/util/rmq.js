let queueName = 'login_history'
let open = require('amqplib').connect('amqp://localhost')

const sendAmqpMessage = async (data) => {
    try {
        const conn = await open
        const channel = await conn.createChannel()

        await channel.assertQueue(queueName)

        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)))
    } catch (err) {
        console.log(err.message)
    }
}

module.exports.sendAmqpMessage = sendAmqpMessage