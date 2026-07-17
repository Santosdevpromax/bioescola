const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Senha de proteção do painel admin
const SENHA_CORRETA = 'admin123';

let conteudos = [
    {
        id: "1",
        titulo: "Introdução à Citologia",
        categoria: "citologia",
        texto: "A citologia é o ramo da biologia que estuda as células, suas estruturas e funções. Todas as plantas e animais são formados por células básicas que mantêm a vida.",
        imagem: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500" // Exemplo de imagem padrão
    }
];

// Rota principal - carrega o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a página de administração
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Rota para verificar a senha digitada pelo usuário
app.post('/api/login', (req, res) => {
    const { senha } = req.body;
    if (senha === SENHA_CORRETA) {
        res.json({ autorizado: true });
    } else {
        res.status(401).json({ autorizado: false, mensagem: "Senha incorreta!" });
    }
});

// Listar todos os conteúdos
app.get('/api/conteudos', (req, res) => {
    res.json({ dados: conteudos });
});

// Criar um novo conteúdo
app.post('/api/conteudos', (req, res) => {
    const { titulo, categoria, texto, imagem } = req.body;
    const novo = { id: Date.now().toString(), titulo, categoria, texto, imagem: imagem || ""