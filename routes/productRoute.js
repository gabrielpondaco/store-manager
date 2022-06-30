const { Router } = require('express');
const productController = require('../controllers/productController');

const productRouter = Router();

productRouter.get('/', productController.list);
productRouter.get('/:id', productController.getById);
module.exports = productRouter;