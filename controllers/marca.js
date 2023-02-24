const { request, response } = require('express');
const Marca = require('../models/marca');


const getMarcas = async (req = request, res = response) => {

     //condiciones del get
     const query = { estado: true };

     const listaMarcas = await Promise.all([
         Marca.countDocuments(query),
         Marca.find(query).populate('usuario', 'nombre')
     ]);
 
     res.json({
         msg: 'get Api - Controlador Usuario',
         listaMarcas
     });

}


const getMarcaPorID = async (req = request, res = response) => {

   const { id } = req.params;
   const marcaById = await Marca.findById( id ).populate('usuario', 'nombre');

   res.status(201).json( marcaById );

}


const postMarca = async (req = request, res = response) => {
    //toUpperCase para todo a Mayusculas
    const nombre = req.body.nombre.toUpperCase();

    const marcaDB = await Marca.findOne({ nombre });

    //validacion para verificar si ya existe dicha marca para que no lo agregue
    if (marcaDB) {
        return res.status(400).json({
            msg: `La marca ${marcaDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const marca = new Marca(data);
    //Guardar en DB
    await marca.save();

    res.status(201).json(marca);

}


const putMarca = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    //Editar o actualiar la cateogira
    const marcaEditada = await Marca.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(marcaEditada);

}

const deleteMarca = async (req = request, res = response) => {

    const { id } = req.params;

    //Editar o actualiar la cateogira: Estado FALSE
    const marcaBorrada = await Marca.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(201).json(marcaBorrada);

}




module.exports = {
    getMarcas,
    getMarcaPorID,
    postMarca,
    putMarca,
    deleteMarca
}
