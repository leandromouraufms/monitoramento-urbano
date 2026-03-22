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

-- Inserção do Usuário Padrão para Denúncias Anônimas
INSERT OR IGNORE INTO usuarios (id_usuario, nome, cpf, senha, perfil) 
VALUES (999, 'Cidadao Anonimo', '000.000.000-00', 'nao_se_aplica', 'Cidadao');

-- Inserção do Usuário Fiscal para Testes de Acesso
INSERT OR IGNORE INTO usuarios (nome, cpf, senha, perfil) 
VALUES ('Leandro Fiscal', '123.456.789-00', '1234', 'Fiscal');

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

-- 1. INSERÇÃO: O sistema gera o ID automaticamente (Auto-incremento)
INSERT INTO denuncias (tipo_foco, descricao, endereco_completo, status) 
VALUES ('Mato Alto / Água Parada', 'Terreno baldio com descarte de pneus', 'Rua Polônia, 450, São Conrado', 'Pendente');

INSERT INTO denuncias (tipo_foco, descricao, endereco_completo, status) 
VALUES ('Lixo Acumulado', 'Descarte irregular de móveis e entulho', 'Rua General Ângelo, 120, São Conrado', 'Pendente');

-- 2. CONSULTA: Verificando as denúncias que acabaram de entrar
SELECT * FROM denuncias;

-- 3. ATUALIZAÇÃO: Vamos atualizar SEMPRE a última denúncia inserida
-- (Isso garante que o comando funcione mesmo que os IDs subam)
UPDATE denuncias 
SET status = 'Encaminhado Prefeitura' 
WHERE id_denuncia = (SELECT MAX(id_denuncia) FROM denuncias);

-- 4. REGISTRO DE PROTOCOLO: Vinculando ao último ID gerado
INSERT INTO protocolos_prefeitura (id_denuncia, numero_oficio)
VALUES ((SELECT MAX(id_denuncia) FROM denuncias), 'OF-2024/SC-' || (SELECT MAX(id_denuncia) FROM denuncias));

-- 5. REMOÇÃO: Apenas para demonstrar que o comando funciona
-- Deletamos um ID específico se ele existir (ex: o 2)
DELETE FROM denuncias WHERE id_denuncia = 2;

-- 6. CONSULTA FINAL: Mostrando o resultado de tudo
SELECT * FROM usuarios;
SELECT * FROM denuncias;
SELECT * FROM protocolos_prefeitura;