<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Painel Bio-Master</title>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #0a0a0a; color: #fff; padding: 30px; }
        .painel { max-width: 600px; margin: auto; background: #111; padding: 25px; border-radius: 10px; border: 1px solid #333; }
        input, select, textarea { width: 100%; padding: 12px; margin: 10px 0; background: #1a1a1a; border: 1px solid #444; color: #fff; border-radius: 5px; box-sizing: border-box; }
        button { width: 100%; padding: 15px; background: #00ff66; border: none; font-weight: bold; cursor: pointer; border-radius: 5px; color: #000; font-size: 16px; }
        button:hover { filter: brightness(1.2); }
        #conteudoAdmin { display: none; }
        label { color: #00ff66; font-size: 14px; font-weight: bold; }
    </style>
</head>
<body>

    <div id="loginSection" style="text-align: center; margin-top: 100px; max-width: 400px; margin-left: auto; margin-right: auto;">
        <h2>Acesso ao Núcleo Central</h2>
        <input type="password" id="pass" placeholder="Digite a senha bio-mestre">
        <button onclick="verificar()">ACESSAR</button>
    </div>

    <div class="painel" id="conteudoAdmin">
        <h2>GERENCIADOR DE DADOS</h2>
        <form id="formConteudo">
            <label>Título da Matéria</label>
            <input type="text" id="titulo" placeholder="Ex: Divisão Celular" required>
            
            <label>Categoria</label>
            <select id="categoria">
                <option value="citologia">Citologia</option>
                <option value="zoologia">Zoologia</option>
                <option value="botanica">Botânica</option>
                <option value="genetica">Genética</option>
                <option value="evolucao">Evolução</option>
            </select>
            
            <label>URL da Imagem Ilustrativa (Opcional)</label>
            <input type="url" id="imagem" placeholder="Cole o link da imagem aqui (ex: https://site.com/foto.jpg)">

            <label>Texto da Matéria</label>
            <textarea id="texto" rows="6" placeholder="Texto completo aqui..." required></textarea>
            
            <button type="submit">PUBLICAR NO SISTEMA</button>
        </form>
        <button onclick="window.location.href='/'" style="background: #333; color: #fff; margin-top: 10px;">VOLTAR AO SITE</button>
    </div>

    <script>
        async function verificar() {
            const senhaDigitada = document.getElementById('pass').value;
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ senha: senhaDigitada })
            });

            if(res.ok) {
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('conteudoAdmin').style.display = 'block';
            } else { 
                alert("Senha Incorreta!"); 
            }
        }

        document.getElementById('formConteudo').addEventListener('submit', async (e) => {
            e.preventDefault();
            const dados = {
                titulo: document.getElementById('titulo').value,
                categoria: document.getElementById('categoria').value,
                imagem: document.getElementById('imagem').value,
                texto: document.getElementById('texto').value
            };

            const res = await fetch('/api/conteudos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dados)
            });

            if(res.ok) {
                alert("Publicado com sucesso!");
                document.getElementById('formConteudo').reset();
            } else {
                alert("Erro ao publicar conteúdo.");
            }
        });
    </script>
</body>
</html>