import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const port = 3306;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}.`);
});