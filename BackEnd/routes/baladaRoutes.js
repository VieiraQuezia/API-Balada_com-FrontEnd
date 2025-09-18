//clienteRoutes.js 
const express = require('express'); 
const router = express.Router(); 
const baladaController = require('../controllers/baladaController'); 
//Lembrando que a rota raiz tem a palavra clientes, definido no app.js 

// Rota para obter todos as baladas 
router.get('/', baladaController.getAllBaladas); 
// Rota para obter uma balada pela cidade 
router.get('/:cidade', baladaController.getBaladaByCidade); 
// Rota para obter uma balada pela data 
router.get('/data/:data', baladaController.getBaladaByData);
// Rota para criar um novo cliente 
router.post('/', baladaController.createBalada); 

// Rota para deletar um cliente 
router.delete('/:id', baladaController.deleteBalada); 
module.exports = router;