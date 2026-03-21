-- =============================================================
-- SISMONI - Sistema de Monitoramento Urbano (Módulo 3)
-- Localização: São Conrado, Campo Grande/MS
-- =============================================================

-- Parte 1: MODELAGEM (Criação do Banco e Tabelas)
CREATE DATABASE IF NOT EXISTS sismoni_db;
USE sismoni_db;

-- Tabela de Usuários (Fiscais e Administradores)
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('Cidadao', 'Fiscal', 'Adm') DEFAULT 'Cidadao'
);

-- Tabela de Denúncias (Focos detectados)
CREATE TABLE denuncias (
    id_denuncia INT PRIMARY KEY AUTO_INCREMENT,
    tipo_foco VARCHAR(50) NOT NULL,
    descricao TEXT,
    endereco_completo VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pendente', 'Em Analise', 'Encaminhado Prefeitura', 'Resolvido') DEFAULT 'Pendente'
);

-- Tabela de Protocolos para a Prefeitura (Integração Governamental)
CREATE TABLE protocolos_prefeitura (
    id_protocolo INT PRIMARY KEY AUTO_INCREMENT,
    id_denuncia INT,
    numero_oficio VARCHAR(20) UNIQUE,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    secretaria_destino VARCHAR(100) DEFAULT 'Secretaria de Obras e Urbanismo',
    FOREIGN KEY (id_denuncia) REFERENCES denuncias(id_denuncia)
);

-- -------------------------------------------------------------
-- Parte 2: MANIPULAÇÃO DE DADOS (DML)
-- -------------------------------------------------------------

-- 1. INSERÇÃO: Simulando o registro de um foco no São Conrado
INSERT INTO denuncias (tipo_foco, descricao, endereco_completo, status) 
VALUES ('Mato Alto / Água Parada', 'Terreno baldio com descarte de pneus', 'Rua Polônia, 450, São Conrado', 'Pendente');

-- 2. CONSULTA: Localizando denúncias para triagem do fiscal
SELECT * FROM denuncias WHERE status = 'Pendente';

-- 3. ATUALIZAÇÃO: Alterando status após o envio oficial à prefeitura
UPDATE denuncias 
SET status = 'Encaminhado Prefeitura' 
WHERE id_denuncia = 1;

-- 4. REGISTRO DE PROTOCOLO: Vinculando a denúncia ao envio oficial
INSERT INTO protocolos_prefeitura (id_denuncia, numero_oficio)
VALUES (1, 'OF-2024/SC-001');