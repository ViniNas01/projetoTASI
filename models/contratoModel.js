import db from '../db.js';

const contratoModel = {
  async criar(cliente_id, profissional) {
    const sql = `
      INSERT INTO contratos (cliente_id, profissional_id, profissional_nome, categoria)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(sql, [
      cliente_id,
      profissional.id,
      profissional.nome,
      profissional.categoria
    ]);
  },

  async listarPorCliente(cliente_id) {
    const sql = `
      SELECT id, profissional_nome, categoria, data_contratacao, status
      FROM contratos
      WHERE cliente_id = ?
      ORDER BY data_contratacao DESC
    `;
    const [rows] = await db.query(sql, [cliente_id]);
    return rows;
  }
,

  async findById(id) {
    const sql = `SELECT * FROM contratos WHERE id = ?`;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  async atualizar(id, { profissional_nome, categoria, status }) {
    const sql = `UPDATE contratos SET profissional_nome = ?, categoria = ?, status = ? WHERE id = ?`;
    await db.query(sql, [profissional_nome, categoria, status, id]);
  },

  async excluir(id) {
    const sql = `DELETE FROM contratos WHERE id = ?`;
    await db.query(sql, [id]);
  }
};

export default contratoModel;
