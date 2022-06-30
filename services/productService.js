const productModel = require('../models/productModel');

const productService = {
  async list() {
    const items = await productModel.list();
    return items;
  },
};

module.exports = productService;