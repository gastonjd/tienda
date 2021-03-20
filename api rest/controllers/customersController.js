const Customers = require('../models/Customers')
//Consultar los clientes
exports.list = async (req, res) =>{
    try{
        const customers = await Customers.find({});
        res.json(customers);
    }catch(error){
        console.log(error);
        res.send(error);
        next();
    }
};

//Agregar cliente
exports.add = async (req, res) =>{
    const customer = new Customers(req.body);

    try{
        await customer.save();
        res.json({message: 'Nuevo cliente agregado!'})
    }catch(error){
        console.log(error);
        res.send(error);
        next();
    };
};

//leer cliente por id

exports.show = async (req, res, next) =>{
    try{
        const customer = await Customers.findById(req.params.id);
        if(!customer){
            res.status(400).json({message: 'El cliente no existe'});
        }
        res.json(customer);
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    }
}

//modificar cliente
exports.update = async (req, res, next) =>{
    try{
        const customer = await Customers.findOneAndUpdate(
            {_id: req.params.id},
             req.body,
             );
        res.json({
            message: 'cliente actualizado correctamente'
        });
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    }
}
//eliminar cliente
exports.delete = async (req, res, next) => {
    try{
        await Customers.findOneAndDelete({_id: req.params.id});
        res.json({message: 'El cliente a sido eliminado'});
    }catch(error){
        res.status(400).json({
            message: 'Error al procesar la petición'
        });
    }
}