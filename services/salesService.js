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
    if (item.length === 0 || !item) {
      throw new Error('Sale not found');
    }
    return item;
  },
  async getAll() {
    const items = await salesModel.getAll();
    return items;
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
