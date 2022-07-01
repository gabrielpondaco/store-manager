const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = Router();

salesRouter.post('/', salesController.add);
module.exports = salesRouter;
