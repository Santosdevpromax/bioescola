const express = require('express');
const cors = require('cors');
const app = express();

// Configurações obrigatórias
app.use(cors());
app.use(express.json());

// 🌟 ESSENCIAL: Serve os arquivos HTML (index.html, admin.html) na rota principal
app.use(express.static(__dirname));

// Banco de dados temporário na memória do servidor
let conteudos = [
    {
        id: "1",
        titulo: "Introdução à Citologia",
        categoria: "citologia",
        texto: "A citologia é o ramo da biologia que estuda as células, suas estruturas e funções. Todas as plantas e animais são formados por células."
    },
    {
        id: "2",
        titulo: "O Reino Plantae (Botânica)",
        categoria: "botanica",
        texto: "A botânica estuda as plantas. Elas são seres autotróficos, o que significa que produzem seu próprio alimento através da fotossíntese."
    }
];

// Rota 1: Listar todos os conteúdos (GET)
app.get('/api/conteudos', (req, res) => {
    res.json({ dados: conteudos });
});

// Rota 2: Criar um novo conteúdo (POST)
app.post('/api/conteudos', (req, res) => {
    const { titulo, categoria, texto } = req.body;
    
    const novo = {
        id: Date.now().toString(), // Gera um ID único baseado no tempo
        titulo,
        categoria,
        texto
    };

    conteudos.push(novo);
    res.status(201).json({ mensagem: "Criado com sucesso!", dado: novo });
});

// Rota 3: Deletar um conteúdo (DELETE)
app.delete('/api/conteudos/:id', (req, res) => {
    const { id } = req.params;
    conteudos = conteudos.filter(c => c.id !== id);
    res.json({ mensagem: "Excluído com sucesso!" });
});

// Porta automática do Render ou 5000 local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});