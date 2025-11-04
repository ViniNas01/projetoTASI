import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vno!120601',
    database: 'cliente_db',
    port: 3000
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

