const productService = require('../services/productService');

const productController = {
  /** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    const items = await productService.getAll();
    return res.status(200).json(items);
  },

  async getById(req, res) {
    try {
      const item = await productService.getById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  },

  async add(req, res) {
    const item = await productService.add(req.body.name);
    return res.status(201).json(item);
  },
};

module.exports = productController;