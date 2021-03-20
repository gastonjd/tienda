const multer = require('multer');
const multerConfig = require('../utils/multerConfig')

const Products = require('../models/Products');

const upload = multer(multerConfig).single('image');

exports.fileUpload = (req, res, next) => {
    upload(req, res, (error) => {
        if(error){
            res.json({messager: error})
        }
        return next();
    })
}

exports.list = async (req, res, next) => {
    try{
        const products = await Products.find({});
        res.json(products);
    }catch(error){
        console.log(error);
        res.send(error);
        next();
    };
};

exports.add = async (req, res) =>{
    const product = new Products(req.body);
    try{
        if(req.file && req.file.filename){
            product.image = req.file.filename;
        }
        await product.save();
        res.json({
            messager: 'El producto fue guardado con exito'
        });

    }catch(error){
        if(error.code === 11000){
            res.status(400).json({
                messager: ` ya existe un producto con el sku: ${req.body.sku}`
            })
        }else{
            res.status(400).json({
                mesagger: 'Error al procesar su peticion'
            });
        };
    };
};

exports.update = async (req, res) =>{
    try{
        let newProduct = req.body;
        if(req.file && req.file.filename){
            newProduct.image = req.file.filename;
        }else{
            const product = await Products.findById(req.params.id);
            newProduct.image = product.image;
        }
        const productUpdate = await Products.findOneAndUpdate({
            _id: req.params.id},
            newProduct,
            );
        res.json({
            message: 'cliente actualizado correctamente'
        });
    }catch(error){
        if(error === 11000){
            res.status(400).json({
                messager: ` ya existe un producto con el sku: ${req.body.sku}`
            })
        }else{
            res.status(400).json({
                messager: 'Hubo un problema en la peticion'
            });
        };
    };
};

exports.show = async (req, res, next) =>{
    try{
        const product = await Products.findById(req.params.id);
        if(!product){
            res.status(400).json({
                messager: 'No existe el producto'
            })};
        res.json(product);
    }catch(error){
        console.log(error);
        res.send(error);
        next();
    };
};

exports.delete = async (req, res) => {
    try{
        await Products.findOneAndDelete({_id: req.params.id});
        res.json({
            message: ' El producto fue eliminado'
        })
    }catch(error){
        res.status(400).json({
            mesagge: 'Hubo un error al intentar borrar'
        });
    };
};
 