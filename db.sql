CREATE DATABASE cliente_db;

USE cliente_db;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    endereco VARCHAR(100),
    telefone VARCHAR(100)
)