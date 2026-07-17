const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const SENHA_CORRETA = 'admin123';

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
        res.status(401).json({ autorizado: false, message: "Senha incorreta!" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});