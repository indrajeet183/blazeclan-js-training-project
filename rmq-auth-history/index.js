let queueName = 'login_history'
let open = require('amqplib').connect('amqp://localhost')
const { db } = require('./db')

const connect = async () => {
    try {
        const conn = await open
        const channel = await conn.createChannel()

        await channel.assertQueue(queueName)

        channel.consume(queueName, (message) => {
            if (message !== null) {
                const data = message.content.toString()
                console.log(data)
                if (data.length > 0) {
                    db.login_history.create(JSON.parse(data))
                }
                // console.log(message.content.toString());
                channel.ack(message);
            }
        })
    } catch (err) {
        console.log(err.message)
    }
}


connect()