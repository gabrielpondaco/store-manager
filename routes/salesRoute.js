const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.get('/:id', salesController.getById);
salesRouter.get('/', salesController.getAll);
salesRouter.post('/', salesController.add);
module.exports = salesRouter;
