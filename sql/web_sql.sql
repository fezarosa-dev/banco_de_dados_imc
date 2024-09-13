CREATE TABLE pessoa (
    codigo SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    datanasc DATE,
    datacadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    casado BOOLEAN,
    altura REAL,
    peso REAL
);



DROP TABLE pessoa



SELECT * FROM pessoa
ORDER BY nome;
