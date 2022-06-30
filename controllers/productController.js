const productService = require('../services/productService');

const productController = {
  /** @type {import('express').RequestHandler} */
  async list(req, res) {
    const items = await productService.list();
    res.status(200).json(items);
  },
};

module.exports = productController;