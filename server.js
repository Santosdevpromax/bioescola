const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const SENHA_CORRETA = 'admin123';

// Mudança crucial: Salvando na pasta /tmp do Linux do Render para evitar erros de permissão
const CAMINHO_ARQUIVO = path.join(os.tmpdir(), 'bioescola_conteudos.json');

function carregarConteudos() {
    try {
        if (fs.existsSync(CAMINHO_ARQUIVO)) {
            const dados = fs.readFileSync(CAMINHO_ARQUIVO, 'utf8');
            return JSON.parse(dados);
        }
    } catch (error) {
        console.error("Erro ao ler o arquivo de dados:", error);
    }
    return [
        {
            id: "1",
            titulo: "Introdução à Citologia",
            categoria: "citologia",
            texto: "A citologia é o ramo da biologia que estuda as células, suas estruturas e funções. Todas as plantas e animais são formados por células básicas que mantêm a vida.",
            imagem: ""
        }
    ];
}

function salvarConteudos(dados) {
    try {
        fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(dados, null, 2), 'utf8');
    } catch (error) {
        console.error("Erro ao salvar o arquivo de dados:", error);
    }
}

let conteudos = carregarConteudos();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.post('/api/login', (req, res) => {
    const { senha } = req.body;
    if (senha === SENHA_CORRETA) {
        res.json({ autorizado: true });
    } else {
        res.status(401).json({ autorizado: false, mensagem: "Senha incorreta!" });
    }
});

app.get('/api/conteudos', (req, res) => {
    res.json({ dados: conteudos });
});

app.post('/api/conteudos', (req, res) => {
    try {
        const { titulo, categoria, texto, imagem } = req.body;
        const novo = { id: Date.now().toString(), titulo, categoria, texto, imagem: imagem || "" };
        
        conteudos.push(novo);
        salvarConteudos(conteudos); 
        
        res.status(201).json({ mensagem: "Criado com sucesso!", dado: novo });
    } catch (err) {
        res.status(500).json({ mensagem: "Erro interno ao salvar matéria." });
    }
});

app.get('/api/backup', (req, res) => {
    res.json(conteudos);
});

app.post('/api/restaurar', (req, res) => {
    const { dadosNovos, senha } = req.body;
    if (senha === SENHA_CORRETA && Array.isArray(dadosNovos)) {
        conteudos = dadosNovos;
        salvarConteudos(conteudos);
        res.json({ mensagem: "Sistema restaurado com sucesso!" });
    } else {
        res.status(401).json({ mensagem: "Não autorizado ou dados inválidos" });
    }
});

app.delete('/api/conteudos/:id', (req, res) => {
    const { id } = req.params;
    conteudos = conteudos.filter(c => c.id !== id);
    salvarConteudos(conteudos); 
    res.json({ mensagem: "Excluído com sucesso!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});