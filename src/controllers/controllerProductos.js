const Producto = require('../models/producto')
const Fabricante=require('../models/fabricante')


const getProductos = async(req,res) =>{
    try{
        const productos = await Producto.findAll()
        return res.status(200).json(productos)
    }
    catch(error){
        return res.status(404)
    }
}

    const crearProducto = async(req,res) =>{
        const { nombre, descripcion, precio } = req.body
        try {
            const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio
        }) 
        return res.status(201).json(nuevoProducto)
        }
        catch(error){
            return res.status(400).send('Error al crear producto',error)
    }
}


const getProductosById = async (req,res) =>{
    const id = req.params.id
    try{
        const producto = await Producto.findByPk(id)
        if(!producto){
            res.status(404).send('Producto no encontrado')
        }
        return res.status(200).json(producto)
    }
    catch{
        return res.status(404).send('Producto no encontrado')
    }
}


const modificarProducto = async(req,res) =>{
    const id = req.params.id
    const producto = await Producto.findByPk(id)
    const datosNuevos = req.body

    if(!producto){
        return res.status(404).send('Producto no encontrado')
    }

    await producto.update(datosNuevos)
    return res.status(200).send('Producto actualizado')
}

const borrarProducto = async(req,res) =>{
    const idProducto = req.params.id
    
    if(!idProducto){
        return res.status(400).send('ID erronea. ')
    }

    try{
        const eliminar = await Producto.destroy({
            where:{
                id:idProducto
            }
        })

        if (!eliminar){
            return res.status(404).send('Producto no encontrado')
        }
        return res.status(200).send('Producto eliminado')
    }
    catch(error){
        return res.status(500).send('Error al eliminar producto')
    }

}
const getFabricantesByProducto = async (req,res) =>{
    const id = req.params.id
    try{
        const producto = await Producto.findByPk(id,{
            include:{
                model:Fabricante
            }
        })
        if(!producto){
            res.status(404).send('Producto no encontrado')
        }
        return res.status(200).json(producto.Fabricantes)
    }
    catch{
        return res.status(404).send('Producto no encontrado')
    }
}

const asociarProductoConFabricante=async(req,res)=>{
    const fabricante=req.params.fabricante
    const producto=req.params.id
    try {
        const producto = await Producto.findByPk(producto);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const fabricante = await Fabricante.findByPk(fabricante);
        if (!fabricante) {
            return res.status(404).json({ error: 'Fabricante no encontrado' });
        }
        await producto.addFabricante(fabricante); 
        res.status(201).json({ message: 'Fabricante asociado al producto' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asociar fabricante' });
    }
};


module.exports = {
    getProductos,
    crearProducto,
    getProductosById,
    modificarProducto,
    borrarProducto,
    getFabricantesByProducto
}