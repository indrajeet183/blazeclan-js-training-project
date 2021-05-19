const Sequelize = require("sequelize");
const initModels = require('./init-models')

// let db = {}
// const db_options = { force: false }
const sequelize = new Sequelize('ecom', 'root', 'root', {
    dialect: "mariadb",
    host: 'localhost',
    port: 3306,
    define: {
        timestamps: true
    }
});

const initializedModels = initModels(sequelize)

// Object.keys(initializedModels).forEach((model) => {
//     db[model] = initializedModels[model]
// })

module.exports = { db: initializedModels, sequelize };