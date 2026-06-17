create database weddingpass;

create table convidados(
    id int primary key AUTO_INCREMENT,
    nome varchar(50) not null,
    email VARCHAR(100) not null UNIQUE,
    cpf VARCHAR(14) not null UNIQUE,
    mesa int not null,
    status BOOLEAN default false,
    criado_em timestamp DEFAULT CURRENT_TIMESTAMP,
    atualizado_em timestamp DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP
);

create table usuarios(
    id int primary key AUTO_INCREMENT,
    email varchar(100) not null,
    senha varchar(255) not null
)