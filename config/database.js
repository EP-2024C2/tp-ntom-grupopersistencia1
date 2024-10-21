const { Sequelize } = require('sequelize')
require('dotenv').config();



const dialect = process.env.DB_DIALECT
const sequelize = new Sequelize({
    dialect:dialect,
    storage:'./data/productos.sqlite'
})

module.exports = sequelize