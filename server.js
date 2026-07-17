const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000; // ALTERADO: Agora o seu servidor vai rodar na porta 5000!

app.use(cors());
app.use(express.json());

// Banco de dados em memória
let conteudos = [
    { id: 1, categoria: 'citologia', titulo: 'O que é a Célula Animal?', texto: 'A célula animal é a unidade fundamental dos seres vivos do reino Animalia. Suas principais organelas são o núcleo, mitocôndrias e complexo de Golgi.' },
    { id: 2, categoria: 'botanica', titulo: 'Fotossíntese: Como as plantas produzem energia', texto: 'A fotossíntese é o processo pelo qual plantas e algas utilizam a luz solar para transformar gás carbônico em energia.' },
    { id: 3, categoria: 'zoologia', titulo: 'Características dos Mamíferos', texto: 'Os mamíferos são animais vertebrados que se destacam pela presença de glândulas mamárias e pelos no corpo.' }
];

// Listar todos os conteúdos
app.get('/api/conteudos', (req, res) => {
    res.json({ dados: [...conteudos].reverse() });
});

// Criar novo conteúdo
app.post('/api/conteudos', (req, res) => {
    const { titulo, categoria, texto } = req.body;
    if (!titulo || !categoria || !texto) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }
    const novo = { id: Date.now(), categoria, titulo, texto };
    conteudos.push(novo);
    res.status(201).json(novo);
});

// Editar conteúdo existente
app.put('/api/conteudos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, categoria, texto } = req.body;
    const index = conteudos.findIndex(c => c.id === id);
    if (index !== -1) {
        conteudos[index] = { id, categoria, titulo, texto };
        return res.json(conteudos[index]);
    }
    res.status(404).json({ erro: 'Não encontrado' });
});

// Excluir conteúdo
app.delete('/api/conteudos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    conteudos = conteudos.filter(c => c.id !== id);
    res.json({ mensagem: 'Conteúdo removido com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`BioEscola rodando na porta ${PORT}`); // Vai exibir "BioEscola rodando na porta 5000"
});