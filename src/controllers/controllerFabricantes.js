const Producto = require('../models/producto')
const Fabricante=require('../models/fabricante')
const Componente=require('../models/componente')


const getFabricantes=async(req,res)=>{
    try{
    const fabricantes= await Fabricante.findAll()
    return res.status(200).json(fabricantes)
}
catch(error){
    return res.status(404)
}
}

const getFabricantesById=async(req,res)=>{
    const idFabricante=req.params.id
    try{
    const fabricante = await Fabricante.findByPk(id)
    if(!fabricante){
        res.status(404).send('Fabricante no encontrado')
    }
    return res.status(200).json(fabricante)
}
    catch{
    return res.status(404).send('Fabricante no encontrado')
}
}
const crearFabricante= async(req,res)=>{
    const { nombre, direccion, numeroContacto } = req.body
    try {
    const nuevoFabricante = await Fabricante.create({
    nombre,
    direccion,
    numeroContacto
        }) 
    return res.status(201).json(nuevoFabricante)
        }
    catch(error){
    return res.status(400).send('Error al crear fabricante',error)
}
}

module.exports={
    getFabricantes,
    getFabricantesById,
    crearFabricante
}