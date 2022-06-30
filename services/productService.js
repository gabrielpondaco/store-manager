const productModel = require('../models/productModel');

const productService = {
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
};

module.exports = productService;