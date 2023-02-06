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
  async update(name, id) {
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
  async delete(id) {
    const sql = `
    DELETE FROM products WHERE id = ?`;
    await db.query(sql, [id]);
    return true;
  },
  async search(query) {
    const likeWord = `%${query}%`;
    const sql = `
    SELECT * FROM products WHERE products.name LIKE ?`;
    const [item] = await db.query(sql, [likeWord]);
    return item;
  },
};

module.exports = productModel;