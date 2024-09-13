const Banco = require("../model/Banco");

class PessoaDAO {
  async gravar(obj) {
    try {
      Banco.init();
      const res = await Banco.conexao.query(
        "INSERT INTO pessoa(nome, datanasc, casado, altura, peso, datacadastro) VALUES($1, $2, $3, $4, $5, COALESCE($6, CURRENT_TIMESTAMP)) RETURNING codigo",
        [obj.nome, obj.datanasc, obj.casado, obj.altura, obj.peso, obj.datahoracadastro]
      );

      Banco.conexao.end();
      return res.rows[0].codigo;
    } catch (erro) {
      console.log(erro);
    }
  }
  

  async alterar(obj) {
    try {
      Banco.init();
      let res = await Banco.conexao.query(
        "UPDATE pessoa SET nome=$1, datanasc=$2, casado=$3, altura=$4, peso=$5 WHERE codigo=$6",
        [obj.nome, obj.datanasc, obj.casado, obj.altura, obj.peso, obj.codigo]
      );
      Banco.conexao.end();
      return res.rowCount;
    } catch (erro) {
      console.log(erro);
    }
  }

  async remover(obj) {
    try {
      Banco.init();
      let res = await Banco.conexao.query(
        "DELETE FROM pessoa WHERE codigo=$1",
        [obj.codigo]
      );
      Banco.conexao.end();
      return res.rowCount;
    } catch (erro) {
      console.log(erro);
    }
  }

  async listar() {
    try {
      Banco.init();
      let res = await Banco.conexao.query("SELECT * FROM pessoa ORDER BY nome");
      Banco.conexao.end();
      return res.rows; // Use res.rows to get the actual data
    } catch (erro) {
      console.log(erro);
    }
  }

  async listarAcimaPeso() {
    try {
      Banco.init();
      let res = await Banco.conexao.query(
        "SELECT * FROM pessoa WHERE (peso / (altura * altura)) > 25"
      );
      Banco.conexao.end();
      return res.rows; // Use res.rows to get the actual data
    } catch (erro) {
      console.log(erro);
    }
  }

  async listarIdadeAcima(idade) {
    try {
      Banco.init();
      let res = await Banco.conexao.query(
        "SELECT * FROM pessoa WHERE EXTRACT(YEAR FROM AGE(datanasc)) > $1",
        [idade]
      );
      Banco.conexao.end();
      return res.rows; // Use res.rows to get the actual data
    } catch (erro) {
      console.log(erro);
    }
  }

  async listarCasados() {
    try {
      Banco.init();
      let res = await Banco.conexao.query(
        "SELECT * FROM pessoa WHERE casado = true"
      );
      Banco.conexao.end();
      return res.rows; // Use res.rows to get the actual data
    } catch (erro) {
      console.log(erro);
    }
  }

  async listarPorNome(nomeParte) {
    try {
      Banco.init();
      let res = await Banco.conexao.query(
        "SELECT * FROM pessoa WHERE nome ILIKE $1 ORDER BY nome",
        ["%" + nomeParte + "%"]
      );
      Banco.conexao.end();
      return res.rows; // Use res.rows to get the actual data
    } catch (erro) {
      console.log(erro);
    }
  }
}

module.exports = PessoaDAO;
