-- =============================================================
-- SISMONI - Sistema de Monitoramento Urbano (Módulo 4 - v1.2)
-- Localização: São Conrado, Campo Grande/MS - Versão SQLite
-- Foco: Integração Full-Stack e Padronização de Dados
-- =============================================================

-- Parte 1: MODELAGEM (Criação das Tabelas)

-- Tabela de Usuários (Ajustada para CPFs Numéricos)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL, -- Alterado para 11 (apenas números)
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) DEFAULT 'Cidadao'
);

-- Inserção do Usuário Padrão para Denúncias Anônimas
-- CPF 00000000000 para manter a integridade referencial
INSERT OR IGNORE INTO usuarios (id_usuario, nome, cpf, senha, perfil) 
VALUES (999, 'Cidadao Anonimo', '00000000000', 'nao_se_aplica', 'Cidadao');

-- Usuário de Sistema (Opcional - para garantir acesso inicial)
-- INSERT OR IGNORE INTO usuarios (nome, cpf, senha, perfil) 
-- VALUES ('Leandro Fiscal', '12345678901', '1234', 'Fiscal');

-- Tabela de Denúncias
CREATE TABLE IF NOT EXISTS denuncias (
    id_denuncia INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_foco VARCHAR(50) NOT NULL,
    descricao TEXT,
    endereco_completo VARCHAR(255) NOT NULL,
    foto_anexo VARCHAR(255), 
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
-- Parte 2: MANIPULAÇÃO DE DADOS (DML) - COMENTADO PARA TESTES RUPTURA
-- -------------------------------------------------------------

/* -- Use os comandos abaixo se precisar inserir dados via script, 
-- mas para o Módulo 4, prefira cadastrar pela INTERFACE para os PRINTS.

INSERT INTO denuncias (tipo_foco, descricao, endereco_completo, foto_anexo, status) 
VALUES ('Mato Alto / Água Parada', 'Terreno baldio com descarte de pneus', 'Rua Polônia, 450, São Conrado', 'terreno_baldio.jpg', 'Pendente');

UPDATE denuncias 
SET status = 'Vistoriado - Gerado Ofício' 
WHERE id_denuncia = (SELECT MAX(id_denuncia) FROM denuncias);

INSERT INTO protocolos_prefeitura (id_denuncia, numero_oficio)
VALUES ((SELECT MAX(id_denuncia) FROM denuncias), 'OF-2026/SC-' || (SELECT MAX(id_denuncia) FROM denuncias));
*/

-- -------------------------------------------------------------
-- CONSULTAS DE CONFERÊNCIA (Rodar para validar os prints)
-- -------------------------------------------------------------
SELECT * FROM usuarios;
SELECT * FROM denuncias;
SELECT * FROM protocolos_prefeitura;