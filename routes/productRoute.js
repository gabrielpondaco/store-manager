const { Router } = require('express');
const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.get('/search', productController.search);
productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.put('/:id', productController.update);
productRouter.delete('/:id', productController.delete);
productRouter.post('/', productController.add);
module.exports = productRouter;
