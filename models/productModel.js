const db = require('./db');

const productModel = {
  async getAll() {
    const sql = 'SELECT * FROM products';
    const [items] = await db.query(sql);
    return items;
  },
  async getById(id) {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [[item]] = await db.query(sql, [id]);
    return item;
  },
  async updateProduct(name, id) {
    const sql = `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;`;
    const [item] = await db.query(sql, [name, id]);
    return item;
  },
  async add(name) {
    const sql = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId: id }] = await db.query(sql, [name]);
    return { name, id };
  },
};

module.exports = productModel;