const { combineTableNames } = require('sequelize/lib/utils')
const { message } = require('../middleware/productoSchema')
const {Componente, Fabricante, Producto} = require('../models/')

const getProductos = async(req,res) =>{
    try{
        const productos = await Producto.findAll()
        return res.status(200).json(productos)
    }
    catch{
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
    return res.status(400).json({message:'Error al crear producto',error})
}
}


const getProductosById = async (req,res) =>{
    const id = req.params.id
    try{
        const producto = await Producto.findByPk(id)
        if(!producto){
            res.status(404).json({message:'Producto no encontrado'})
        }
        return res.status(200).json(producto)
    }
    catch{
        return res.status(404).json({message:'Producto no encontrado'})
    }
}


const modificarProducto = async(req,res) =>{
    const id = req.params.id
    const producto = await Producto.findByPk(id)
    const datosNuevos = req.body

    if(!producto){
        return res.status(404).json({message:'Producto no encontrado'})
    }

    await producto.update(datosNuevos)
    return res.status(200).json({message:'Producto actualizado'})
}


const borrarProducto = async(req,res) =>{
    const idProducto = req.params.id
    
    if(!idProducto){
        return res.status(400).json({message:'ID erronea.'})
    }

    try{
        const producto = await Producto.findByPk(idProducto,{
            include:[Fabricante,Componente]
        })

        if (!producto){
            return res.status(404).json({message:'Producto no encontrado'})
        }
        if(producto.fabricantes.length > 0 || producto.componentes.length > 0){
            const componentes = producto.componentes
            const fabricantes = producto.fabricantes
            return res.status(400).json({message:'No se puede eliminar el producto porque está asociado a un fabricante/componente',componentes,fabricantes})
        }

        const eliminar = await Producto.destroy({
            where:{
                id:idProducto
            }
        })

        return res.status(200).json({message:'Producto eliminado'})
    }
    catch(error){
        return res.status(500).json({message:'Error al eliminar producto',error})
    }

}


const getFabricantesByProducto = async (req,res) =>{
    const id = req.params.id
    try{
        const producto = await Producto.findByPk(id,{
            include:{
                model:Fabricante,
            }
        })
        if(!producto){
            return res.status(404).json({message:'Producto no encontrado'})
        }
        
        return res.status(200).json({producto:producto})
    }
    catch(error){
        return res.status(404).json({message:'Producto no encontrado',error})
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

const asociarProductoConComponente= async(req,res)=>{
    const componente=req.params.componente
    const producto=req.params.id
    try{
        const producto=await Producto.findByPk(producto)
        if(!producto){
            return res.status(404).json({error:"Producto no encontrado"})
        }
        const componente= await Componente.findByPk(componente)
        if(!componente){
            return res.status(404).json({error:"Componente no encontrado"})
        }
        await producto.addComponente(componente); 
        res.status(201).json({ message: 'Componente asociado al producto' });
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"error al asociar componente"})
    }
}

const getComponentesByProducto = async (req,res) =>{
    const id = req.params.id
    try{
        const producto = await Producto.findByPk(id,{
            include:{
                model:Componente
            }
        })
        if(!producto){
            res.status(404).json({message:'Producto no encontrado'})
        }
        return res.status(200).json({producto:producto})
    }
    catch{
        return res.status(404).json({message:'Producto no encontrado'})
    }
}

module.exports = {
    getProductos,
    crearProducto,
    getProductosById,
    modificarProducto,
    borrarProducto,
    asociarProductoConFabricante,
    getFabricantesByProducto,
    asociarProductoConComponente,
    getComponentesByProducto
}