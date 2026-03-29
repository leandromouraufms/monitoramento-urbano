const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO BANCO DE DADOS (Fiel ao seu Schema.sql)
const dbPath = path.resolve(__dirname, 'database', 'sismoni.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite com sucesso.');
        
        // TABELA DE DENÚNCIAS
        db.run(`CREATE TABLE IF NOT EXISTS denuncias (
            id_denuncia INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_foco VARCHAR(50) NOT NULL,
            descricao TEXT,
            endereco_completo VARCHAR(255) NOT NULL,
            foto_anexo VARCHAR(255),
            data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(50) DEFAULT 'Pendente'
        )`);

        // =====================================================================
        // CONTROLE DE TABELA DE USUÁRIOS
        // Para RESETAR os usuários (apagar tudo e recomeçar), descomente a linha do DROP abaixo.
        // CUIDADO: Isso apagará permanentemente todos os fiscais cadastrados!
        // =====================================================================
        // db.run(`DROP TABLE IF EXISTS usuarios`, () => {
            
            db.run(`CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
                nome VARCHAR(100) NOT NULL,
                cpf VARCHAR(14) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                perfil VARCHAR(50) DEFAULT 'Fiscal'
            )`, (err) => {
                if (err) console.error('Erro ao criar tabela de usuários:', err.message);
                else {
                    console.log('Tabela "usuarios" pronta. Dados preservados!');
                    db.run(`INSERT OR IGNORE INTO usuarios (id_usuario, nome, cpf, senha, perfil) 
                            VALUES (999, 'Cidadao Anonimo', '00000000000', 'nao_se_aplica', 'Cidadao')`);
                }
            });

        // }); // Fim do comentário de segurança do DROP TABLE
    }
});

// ROTA DE LOGIN
app.post('/login', (req, res) => {
    const { cpf, senha } = req.body;
    const sql = "SELECT id_usuario, nome, perfil FROM usuarios WHERE cpf = ? AND senha = ?";
    db.get(sql, [cpf, senha], (err, user) => {
        if (err) return res.status(500).json({ error: "Erro no servidor" });
        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(401).json({ success: false, message: "CPF ou Senha incorretos" });
        }
    });
});

// >>> ROTA DE CADASTRO (Com suas mensagens detalhadas) <<<
app.post('/usuarios', (req, res) => {
    const { nome, cpf, senha, perfil } = req.body;
    const sql = `INSERT INTO usuarios (nome, cpf, senha, perfil) VALUES (?, ?, ?, ?)`;
    db.run(sql, [nome, cpf, senha, perfil || 'Fiscal'], function(err) {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err.message);
            return res.status(400).json({ error: 'Este CPF já está cadastrado no sistema.' });
        }
        console.log(`Novo agente cadastrado: ${nome}`);
        res.status(201).json({ message: 'Agente cadastrado com sucesso!', id: this.lastID });
    });
});

// ROTA PARA RECEBER A DENÚNCIA (POST)
app.post('/denuncias', (req, res) => {
    const { tipo_foco, endereco_completo, descricao, status, foto_anexo } = req.body;
    const sql = `INSERT INTO denuncias (tipo_foco, endereco_completo, descricao, status, foto_anexo) VALUES (?, ?, ?, ?, ?)`;
    
    db.run(sql, [tipo_foco, endereco_completo, descricao, status || 'Pendente', foto_anexo], function(err) {
        if (err) {
            console.error('Erro no SQL:', err.message);
            return res.status(500).json({ error: 'Erro ao salvar no banco.' });
        }
        res.json({ message: 'Denúncia registrada com sucesso!', id: this.lastID });
    });
});

// ROTA PARA BUSCAR TODAS AS DENÚNCIAS (GET)
app.get('/denuncias', (req, res) => {
    const sql = "SELECT * FROM denuncias ORDER BY id_denuncia DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar dados:', err.message);
            return res.status(500).json({ error: 'Erro ao buscar dados do banco.' });
        }
        res.json(rows);
    });
});

// ROTA PARA EXCLUIR
app.get('/denuncias/excluir/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM denuncias WHERE id_denuncia = ?";
    db.run(sql, id, function(err) {
        if (err) {
            console.error('Erro ao excluir:', err.message);
            return res.status(500).json({ error: 'Erro ao excluir do banco.' });
        }
        res.json({ message: 'Denúncia apagada com sucesso!', mudanças: this.changes });
    });
});

// ROTA PARA VISTORIA
app.post('/denuncias/vistoriar/:id', (req, res) => {
    const { id } = req.params;
    const { parecer } = req.body;
    const sql = `UPDATE denuncias SET status = 'Vistoriado', descricao = descricao || ' | PARECER: ' || ? WHERE id_denuncia = ?`;

    db.run(sql, [parecer, id], function(err) {
        if (err) {
            console.error('Erro ao atualizar vistoria:', err.message);
            return res.status(500).json({ error: 'Erro ao salvar vistoria.' });
        }
        res.json({ message: 'Vistoria registrada com sucesso!' });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});