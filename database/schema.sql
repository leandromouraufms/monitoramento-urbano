-- =============================================================
-- SISMONI - Sistema de Monitoramento Urbano (Módulo 3)
-- Localização: São Conrado, Campo Grande/MS - Versão SQLite
-- =============================================================

-- Comandos de Limpeza (caso necessite limpar o sismoni.db para testes)
-- DROP TABLE IF EXISTS protocolos_prefeitura; 
-- DROP TABLE IF EXISTS denuncias;
-- DROP TABLE IF EXISTS usuarios;
-- DELETE FROM sqlite_sequence WHERE name='denuncias';


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
    foto_anexo VARCHAR(255), -- Armazena o nome ou caminho do arquivo anexo
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
INSERT INTO denuncias (tipo_foco, descricao, endereco_completo, foto_anexo, status) 
VALUES ('Mato Alto / Água Parada', 'Terreno baldio com descarte de pneus', 'Rua Polônia, 450, São Conrado', 'terreno_baldio.jpg', 'Pendente');

INSERT INTO denuncias (tipo_foco, descricao, endereco_completo, foto_anexo, status) 
VALUES ('Lixo Acumulado', 'Descarte irregular de móveis e entulho', 'Rua General Ângelo, 120, São Conrado', 'entulho_rua.png', 'Pendente');

-- 2. CONSULTA: Verificando as denúncias que acabaram de entrar
SELECT * FROM denuncias;

-- 3. ATUALIZAÇÃO: Mudando o status para refletir a geração do documento oficial
UPDATE denuncias 
SET status = 'Vistoriado - Gerado Ofício' 
WHERE id_denuncia = (SELECT MAX(id_denuncia) FROM denuncias);

-- 4. REGISTRO DE PROTOCOLO: Vinculando ao último ID gerado
INSERT INTO protocolos_prefeitura (id_denuncia, numero_oficio)
VALUES ((SELECT MAX(id_denuncia) FROM denuncias), 'OF-2026/SC-' || (SELECT MAX(id_denuncia) FROM denuncias));

-- 5. REMOÇÃO: (Preservado conforme original para seus testes)
-- Quando for testar a remoção, selecione a linha abaixo, ativá-la e rodar apenas ela:
-- DELETE FROM denuncias WHERE id_denuncia = 5;

-- 6. CONSULTA FINAL: Mostrando o resultado de tudo
SELECT * FROM usuarios;
SELECT * FROM denuncias;
SELECT * FROM protocolos_prefeitura;