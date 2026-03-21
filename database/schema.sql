-- =============================================================
-- SISMONI - Sistema de Monitoramento Urbano (Módulo 3)
-- Localização: São Conrado, Campo Grande/MS - Versão SQLite
-- =============================================================

-- Parte 1: MODELAGEM (Criação das Tabelas)

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) DEFAULT 'Cidadao'
);

-- Tabela de Denúncias
CREATE TABLE IF NOT EXISTS denuncias (
    id_denuncia INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_foco VARCHAR(50) NOT NULL,
    descricao TEXT,
    endereco_completo VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pendente'
);

-- Tabela de Protocolos para a Prefeitura
CREATE TABLE IF NOT EXISTS protocolos_prefeitura (
    id_protocolo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_denuncia INTEGER,
    numero_oficio VARCHAR(20) UNIQUE,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    secretaria_destino VARCHAR(100) DEFAULT 'Secretaria de Obras e Urbanismo',
    FOREIGN KEY (id_denuncia) REFERENCES denuncias(id_denuncia)
);

-- -------------------------------------------------------------
-- Parte 2: MANIPULAÇÃO DE DADOS (DML) - EXECUÇÃO DOS TESTES
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

-- 5. CONSULTA FINAL: Verificando o resultado da atualização
SELECT * FROM denuncias;