import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vno!120601',
    database: 'cliente_db'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ', err.message);
        return;
    }

    console.log('Conectado ao MySQL!');
});

export default connection;

