CREATE DATABASE cliente_db;

USE cliente_db;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL,
    endereco VARCHAR(100),
    telefone VARCHAR(100)
);

CREATE TABLE contratos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  profissional_id INT NOT NULL,
  profissional_nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(100),
  data_contratacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'Ativo',
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

