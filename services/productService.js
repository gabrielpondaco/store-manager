const Joi = require('joi');
const productModel = require('../models/productModel');
const { runSchema } = require('./utils');

const productService = {
  validateBodyAdd: runSchema(
    Joi.object({
      name: Joi.string().required().min(5),
    }),
  ),
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
  async update(name, id) {
    await this.getById(id);
    await productModel.update(name, id);
    const updatedProduct = {
      id,
      name,
    };
    return updatedProduct;
  },
  async delete(id) {
    await this.getById(id);
    await productModel.delete(id);
    return true;
  },
  async search(query) {
    const item = await productModel.search(query);
    return item;
  },
};

module.exports = productService;
