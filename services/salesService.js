const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./utils');

const salesService = {
  validateBodyAdd: runSchema(
    Joi.object({
      quantity: Joi.number().integer().required().min(1),
      productId: Joi.required(),
    }),
  ),
  async getById(id) {
    const item = await salesModel.getById(id);
    if (!item) {
      throw new Error('Product not found');
    }
    return item;
  },
  async add(sales) {
    const salesId = await salesModel.addSaleProduct();
    await Promise.all(sales.map((sale) => salesModel.add(sale)));
    const success = {
      id: salesId,
      itemsSold: sales,
    };
    return success;
  },
};

module.exports = salesService;
