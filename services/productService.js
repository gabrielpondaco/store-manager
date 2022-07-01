const Joi = require('joi');
const productModel = require('../models/productModel');
const { runSchema } = require('./utils');

const productService = {
  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  })),

  async getAll() {
    const items = await productModel.getAll();
    return items;
  },
  async getById(id) {
    const item = await productModel.getById(id);
    if (!item) {
      throw new Error('Product not found');
    }
    return item;
  },
  async add(name) {
    const item = await productModel.add(name);
    return item;
  },
  async updateProduct(name, id) {
    await this.getById(id);
    await productModel.updateProduct(name, id);
    const updatedProduct = {
      id,
      name,
    };
    return updatedProduct;
  },
};

module.exports = productService;
