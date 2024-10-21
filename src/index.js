const express = require('express')
const sequelize = require('../config/database')
const { Producto , Fabricante, Componente} = require('./models/')
const route = require('./routes/index')
const {crearDatosIniciales} = require('./seeders/')
require('dotenv').config()


const app = express()

app.use(express.json())

app.use(route)



async function sincronizar() {
    await sequelize.sync({force:true}); // Forzar la creación de tablas
    console.log('Tablas creadas');
    await crearDatosIniciales(); // Sembrar datos
}
sincronizar()


const PORT = process.env.DB_PORT
app.listen(PORT, () =>{
    console.log(`Ejecutando en el puerto ${PORT}`)
})

