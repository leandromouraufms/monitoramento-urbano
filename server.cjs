const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURAÇÃO DO BANCO DE DADOS
// Certifique-se de que o seu ficheiro .db está nesta mesma pasta!
const dbPath = path.resolve(__dirname, 'sismoni.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Erro ao abrir o banco:', err.message);
    else console.log('Conectado ao banco de dados SQLite com sucesso.');
});

// ROTA PARA TESTAR SE O SERVIDOR ESTÁ VIVO
app.get('/teste', (req, res) => {
    res.send('O servidor do SISMONI está a funcionar!');
});

// ROTA PARA RECEBER A DENÚNCIA DO REACT E SALVAR NO BANCO
app.post('/denuncias', (req, res) => {
    const { tipo_foco, logradouro, status } = req.body;
    
    // O SQL que você definiu no Módulo 3
    const sql = `INSERT INTO denuncias (tipo_foco, logradouro, status, data_registro) VALUES (?, ?, ?, date('now'))`;
    
    db.run(sql, [tipo_foco, logradouro, status], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao salvar no banco.' });
        }
        res.json({ 
            message: 'Denúncia registada com sucesso!', 
            id: this.lastID 
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor a correr em http://localhost:${PORT}`);
});