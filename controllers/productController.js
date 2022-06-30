const productService = require('../services/productService');

const productController = {
  /** @type {import('express').RequestHandler} */
  async list(req, res) {
    const items = await productService.list();
    res.status(200).json(items);
  },

  async getById(req, res) {
    try {
      const item = await productService.getById(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = productController;