const salesService = require('../services/salesService');

const salesController = {
  /** @type {import('express').RequestHandler} */
  async getAll(req, res) {
    const items = await salesService.getAll();
    return res.status(200).json(items);
  },

  async add(req, res, next) {
    try {
      await Promise.all(req.body.map((each) => salesService.validateBodyAdd(each)));
      await Promise.all(req.body
        .map((each) => salesService.getById(each.productId)));
      const item = await salesService.add(req.body);
      return res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = salesController;
