import db from '../db';

const clienteModel = {

    async findByTelefone(telefone) {
        const[rows] = await db.query('SELECT * FROM CLIENTES WHERE telefone = ?', [telefone]);
        return rows[0];
    },

    async create({nome, endereco, telefone}) {
        const [results] = await db.query(
            'INSERT INTO clientes (nome, endereco, telefone) VALUES (?, ?, ?)',
            [nome, endereco, telefone]
        );
        const [rows] = await db.query('SELECT * FROM CLIENTES WHERE id = ? ', [results.insertId]);
        return rows[0];
    }
};

module.exports = clienteModel;