import db from '../db.js';

const clienteModel = {

    async findByTelefone(telefone) {
        const [rows] = await db.query('SELECT * FROM clientes WHERE telefone = ?', [telefone]);
        return rows[0];
    },

    async create({ nome, endereco, telefone }) {
        const [results] = await db.query(
            'INSERT INTO clientes (nome, endereco, telefone) VALUES (?, ?, ?)',
            [nome, endereco, telefone]
        );
        const [rows] = await db.query('SELECT * FROM clientes WHERE id = ? ', [results.insertId]);
        return rows[0];
    }
};

export default clienteModel;