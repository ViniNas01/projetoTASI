import express from 'express';
import bodyParser from 'body-parser';
import clienteRoutes from './routes/clienteRoutes.js';
import './db.js';

const app = express();




const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}.`);
});