import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vno!120601', // * quando Rodar o projeto trocar a senha para root
    database: 'projeto_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Testa a conexão na inicialização
(async () => {
    try {
        const conn = await pool.getConnection();
        conn.release();
        console.log('Conectado ao MySQL (pool)!');
    } catch (err) {
        console.error('Erro ao conectar ao MySQL: ', err.message);
    }
})();

export default pool;