-- SISMONI - Sistema de Monitoramento Urbano
-- Esquema do Banco de Dados Relacional (Módulo 3)

CREATE DATABASE IF NOT EXISTS sismoni_db;
USE sismoni_db;

-- 1. Tabela de Usuários (Fiscais e Administradores)
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('Cidadao', 'Fiscal', 'Adm') DEFAULT 'Cidadao'
);

-- 2. Tabela de Denúncias (Focos detectados no São Conrado)
CREATE TABLE denuncias (
    id_denuncia INT PRIMARY KEY AUTO_INCREMENT,
    tipo_foco VARCHAR(50) NOT NULL,
    descricao TEXT,
    endereco_completo VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pendente', 'Em Analise', 'Encaminhado Prefeitura', 'Resolvido') DEFAULT 'Pendente'
);

-- 3. Tabela de Protocolos para a Prefeitura (Integração Governamental)
CREATE TABLE protocolos_prefeitura (
    id_protocolo INT PRIMARY KEY AUTO_INCREMENT,
    id_denuncia INT,
    numero_oficio VARCHAR(20) UNIQUE,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    secretaria_destino VARCHAR(100) DEFAULT 'Secretaria de Obras e Urbanismo',
    FOREIGN KEY (id_denuncia) REFERENCES denuncias(id_denuncia)
);