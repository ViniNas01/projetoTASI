import express from 'express';
import cors from 'cors';
import './db.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}.`);
});