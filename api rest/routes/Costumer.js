const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController'); 

/* GET home page. */
router.get('/customers',customersController.list); 
//agrega
router.post('/customers', customersController.add);
//leer cliente
router.get('/customers/:id', customersController.show);
//modificar cliente 
router.put('/customers/:id', customersController.update);
//eliminar cliente
router.delete('/customers/:id', customersController.delete);

module.exports = router;
