const { Client } = require("pg");
const readline = require("readline");

// Configura a conexão com o banco de dados
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "WEB",
  password: "2121",
  port: 5432,
});

// Conecta ao banco de dados
client.connect();

// Configura o readline para entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Listas de nomes e sobrenomes
const nomes = [
  "Ana",
  "Bruno",
  "Carlos",
  "Daniel",
  "Eduardo",
  "Fernanda",
  "Gabriel",
  "Helena",
  "Igor",
  "Juliana",
];
const sobrenomes = [
  "Silva",
  "Oliveira",
  "Santos",
  "Pereira",
  "Costa",
  "Nascimento",
  "Almeida",
  "Souza",
  "Lima",
  "Rocha",
];

// Função para gerar um nome completo aleatório
const gerarNomeCompleto = () => {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  return `${nome} ${sobrenome}`;
};

// Função para gerar um ano de nascimento aleatório
const gerarAnoNascimento = () => {
  const anoAtual = new Date().getFullYear();
  const anoInicio = anoAtual - 100; // Ajuste o intervalo de anos conforme necessário
  return Math.floor(Math.random() * (anoAtual - anoInicio + 1)) + anoInicio;
};

// Função para gerar dados fictícios
const gerarPessoas = (quantidade) => {
  const pessoas = [];

  for (let i = 0; i < quantidade; i++) {
    const nomeCompleto = gerarNomeCompleto();
    const anoNascimento = gerarAnoNascimento();
    const datanasc = `${anoNascimento}-01-${String((i % 28) + 1).padStart(
      2,
      "0"
    )}`;
    const casado = Math.random() < 0.5;
    const altura = (Math.random() * (1.9 - 1.6) + 1.6).toFixed(2);
    const peso = (Math.random() * (90 - 50) + 50).toFixed(2);

    pessoas.push(
      `('${nomeCompleto}', '${datanasc}', ${casado}, ${altura}, ${peso})`
    );
  }

  return pessoas;
};

// Função para adicionar várias pessoas
const adicionarPessoas = async (quantidade) => {
  const pessoas = gerarPessoas(quantidade);

  // Monta a consulta SQL para inserir as pessoas
  const query = `
    INSERT INTO pessoa (nome, datanasc, casado, altura, peso)
    VALUES ${pessoas.join(", ")}
  `;

  try {
    // Executa a consulta
    await client.query(query);
    console.log("Pessoas adicionadas com sucesso!");
  } catch (err) {
    console.error("Erro ao adicionar pessoas:", err);
  } finally {
    // Encerra a conexão com o banco de dados
    await client.end();
  }
};

// Pergunta ao usuário quantas pessoas deseja adicionar
rl.question("Quantas pessoas você deseja adicionar? ", (resposta) => {
  const quantidade = parseInt(resposta, 10);

  if (isNaN(quantidade) || quantidade <= 0) {
    console.log("Por favor, insira um número válido.");
    rl.close();
  } else {
    adicionarPessoas(quantidade).then(() => rl.close());
  }
});
