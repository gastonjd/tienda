const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController'); 

/* GET home page. */
router.get('/products', productsController.list); 
//agrega
router.post('/products',productsController.fileUpload, productsController.add);
//leer cliente
router.get('/products/:id', productsController.show);
//modificar cliente 
router.put('/products/:id',productsController.fileUpload, productsController.update);
//eliminar cliente
router.delete('/products/:id', productsController.delete);

module.exports = router;