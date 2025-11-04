import express from 'express';
import bodyParser from 'body-parser';
import './db.js';

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));

const port = 3306; // * Quando rodar o projeto alterar a porta

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}.`);
});