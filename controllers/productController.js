const productService = require('../services/productService');

const productController = {
  /** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    const items = await productService.getAll();
    return res.status(200).json(items);
  },

  async getById(req, res, next) {
    try {
      const item = await productService.getById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  },

  async add(req, res, next) {
    try {
      const { name } = await productService.validateBodyAdd(req.body);
      const item = await productService.add(name);
      return res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { name } = await productService.validateBodyAdd(req.body);
      const item = await productService.update(name, req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await productService.delete(req.params.id);
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;