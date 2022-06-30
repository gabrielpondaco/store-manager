const db = require('./db');

const productModel = {
  async list() {
    const sql = 'SELECT * FROM products';
    const [items] = await db.query(sql);
    return items;
  },
};

module.exports = productModel;