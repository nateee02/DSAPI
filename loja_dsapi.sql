CREATE DATABASE loja_dsapi;
USE loja_dsapi;

CREATE TABLE cidades(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY , 
    nome VARCHAR(50)
);

CREATE TABLE clientes(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    nome VARCHAR(100) ,
    altura DOUBLE ,
    nascimento DATE ,
    cidade_id INT NOT NULL ,
    FOREIGN KEY (cidade_id) REFERENCES cidades(id)
);

CREATE TABLE pedidos(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    horario DATETIME ,
    endereco VARCHAR(200) ,
    cliente_id INT ,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE categorias(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    nome VARCHAR(100)
);

CREATE TABLE produtos(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    nome VARCHAR(100) ,
    preco DOUBLE ,
    quantidade DOUBLE ,
    categoria_id INT ,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos_produtos(
	pedido_id INT ,
    produto_id INT ,
    preco DOUBLE ,
    quantidade DOUBLE ,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
INSERT INTO cidades(nome) VALUES ("Porto Alegre") , ("Canoas") , ("Gravataí");

INSERT INTO clientes(nome , altura , nascimento , cidade_id) VALUES ("Luiza" , "1.70" , "2000-03-16" , 1);
INSERT INTO clientes(nome , altura , nascimento , cidade_id) VALUES ("Gustavo" , "1.69" , "2003-05-01" , 2) , ("Laura" , "1.50" , "2004-04-01" , 3) , ("Rafa" , "1.65" , "2002-12-31" , 1);

INSERT INTO categorias(nome) VALUES ("Livros") , ("Eletronicos") , ("Jogos");

INSERT INTO produtos(nome , preco , quantidade , categoria_id) VALUES ("The Last of Us II" , 70.0 , 300.0 , 3) , ("Código Limpo" , 102.0 , 500.0  , 1) , ("Fone bluetooth" , 45.0 , 100.0 , 2);

INSERT INTO pedidos(horario , endereco , cliente_id) VALUES ("2023-05-12 12:34:55" , "Av.Barcelos" , 1);
INSERT INTO pedidos(horario , endereco , cliente_id) VALUES ("2021-12-12 15:00:45" , "Av.Ipiranga" , 1) , ("2023-07-02 00:00:00" , "Rua Teresópolis" , 2) , ("2023-10-31 14:34:45" , "Rua Amizade" , 3);