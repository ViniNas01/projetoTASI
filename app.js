import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import clienteRoutes from './routes/clienteRoutes.js';
import './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', clienteRoutes);

app.get('/', (req, res) => res.redirect('/login'));


const port = 3000; // porta do servidor web

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}.`);
});