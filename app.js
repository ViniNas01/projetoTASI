import express from 'express';
import bodyParser from 'body-parser';
import clienteRoutes from './routes/clienteRoutes.js';
import './db.js';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(clienteRoutes);

const port = 3000; // * Quando rodar o projeto alterar a porta

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}.`);
});