const db = require('./db');

const saleModel = {
  async getById(id) {
    const sql = 'SELECT * FROM sales WHERE id = ?';
    const [[item]] = await db.query(sql, [id]);
    return item;
  },
  async add(sale) {
    const { productId, quantity } = sale;
    const sql = `
    INSERT INTO sales_products (sale_id, product_id, quantity)
    SELECT MAX(id), ?, ? FROM sales
    `;
    await db.query(sql, [productId, quantity]);
    return {};
  },
  async addSaleProduct() {
    const sql = 'INSERT INTO sales (date) VALUES (?)';
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const [{ insertId: id }] = await db.query(sql, [date]);
    return id;
  },
};

module.exports = saleModel;