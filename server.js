const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PessoaDAO = require("./src/controllers/PessoaDAO");
const Pessoa = require("./src/model/Pessoa"); // Certifique-se de que o caminho está correto

// Criação da instância do express
const app = express();

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "view"));

// Instância do DAO
const dao = new PessoaDAO();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.post("/consultar", async (req, res) => {
  let botao = String(req.body.b1).trim();
  let tabela;

  try {
    // Instanciar PessoaDAO
    const pessoaDAO = new PessoaDAO();

    if (botao === "Listar Todos") {
      tabela = await pessoaDAO.listar(); // Use listar() em vez de listarTodos()
    } else if (botao === "Acima do Peso") {
      tabela = await pessoaDAO.listarAcimaPeso();
    } else if (botao === "Mais de X Anos") {
      let idade = parseInt(req.body.txtIdade);
      if (isNaN(idade)) {
        res.send("Idade inválida.");
        return;
      }
      tabela = await pessoaDAO.listarIdadeAcima(idade); // Use listarIdadeAcima() em vez de listarMaiorIdade()
    } else if (botao === "Casados") {
      tabela = await pessoaDAO.listarCasados();
    } else if (botao === "Buscar por Nome") {
      let nome = req.body.txtNome;
      tabela = await pessoaDAO.listarPorNome(nome);
    }

    if (tabela) {
      res.render("mostrarTabela", { pessoas: tabela }); // Certifique-se de usar a chave correta 'pessoas'
    } else {
      res.send("Nenhum resultado encontrado.");
    }
  } catch (erro) {
    console.log("Erro -> " + erro);
    res.send("Erro ao processar a solicitação.");
  }
});

app.post("/cadastrar", async (req, res) => {
  let pessoa = new Pessoa();
  let botao = String(req.body.b1).trim();
  try {
    if (botao === "Gravar") {
      pessoa.nome = req.body.txtNome;
      pessoa.datanasc = req.body.txtDataNasc;
      pessoa.casado = req.body.txtCasado === "on";
      pessoa.altura = parseFloat(req.body.txtAltura);
      pessoa.peso = parseFloat(req.body.txtPeso);

      // Não definir datahoracadastro se não fornecido
      if (req.body.txtDataCadastro && req.body.txtDataCadastro.trim() !== "") {
        pessoa.datahoracadastro = req.body.txtDataCadastro;
      } else {
        pessoa.datahoracadastro = null;
      }

      let codigo = await dao.gravar(pessoa);
      res.send("Salvo com código = " + codigo);
    } else if (botao === "Alterar") {
      pessoa.nome = req.body.txtNome;
      pessoa.datanasc = req.body.txtDataNasc;
      pessoa.casado = req.body.txtCasado === "on";
      pessoa.altura = parseFloat(req.body.txtAltura);
      pessoa.peso = parseFloat(req.body.txtPeso);
      pessoa.codigo = parseInt(req.body.txtCodigo);

      let qtde = await dao.alterar(pessoa);
      res.send(qtde + " registro(s) alterado com sucesso.");
    } else if (botao === "Remover") {
      pessoa.codigo = parseInt(req.body.txtCodigo);
      let qtde = await dao.remover(pessoa);
      res.send(qtde + " registro(s) removido com sucesso");
    } else if (botao === "Listar") {
      let nome = req.body.txtNome;
      let pessoas = await dao.listar(nome);
      res.render("mostrarTabela", { pessoas });
    }
  } catch (erro) {
    console.log("Erro ->" + erro);
    res.send("Erro ao processar a solicitação.");
  }
});

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const pathpublic = require("path");

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(pathpublic.join(__dirname, "public")));

// Inicia o servidor
const porta = 3000;
app.listen(porta, (erro) => {
  if (erro) {
    console.log("Erro: " + erro);
  } else {
    console.log("Servidor iniciado na porta: " + porta);
  }
});
