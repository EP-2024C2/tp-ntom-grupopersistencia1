const { Model, DataTypes } = require('sequelize')
const sequelize = require('../../config/database')

class Producto extends Model {}

Producto.init({
    nombre:{
        type:DataTypes.STRING(),
        allowNull:false,
        unique:true
    },
    descripcion: DataTypes.STRING(),
    precio:{
        type:DataTypes.FLOAT(),
        allowNull:false
    },
    pathimg:DataTypes.STRING()
    },{
        sequelize,
        modelName:'producto',
        timestamps: false
    })

module.exports = Producto
