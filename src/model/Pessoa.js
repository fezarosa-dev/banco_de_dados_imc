module.exports = class Pessoa {
  #codigo;
  #nome;
  #datanasc;
  #casado;
  #altura;
  #peso;
  #datahoracadastro
  constructor() {
    this.#codigo = -1;
    this.#nome = "";
    this.#datanasc = null;
    this.#casado = false;
    this.#altura = 0;
    this.#peso = 0;
    this.#datahoracadastro = null;
  }

  set codigo(codigo) {
    this.#codigo = codigo;
  }
  get codigo() {
    return this.#codigo;
  }

  set nome(nome) {
    this.#nome = nome;
  }
  get nome() {
    return this.#nome;
  }

  set datanasc(datanasc) {
    this.#datanasc = datanasc;
  }
  get datanasc() {
    return this.#datanasc;
  }

  set casado(casado) {
    this.#casado = casado;
  }
  get casado() {
    return this.#casado;
  }

  set altura(altura) {
    this.#altura = altura;
  }
  get altura() {
    return this.#altura;
  }

  set peso(peso) {
    this.#peso = peso;
  }
  get peso() {
    return this.#peso;
  }

  set datahoracadastro(datahoracadastro) {
    this.#datahoracadastro = datahoracadastro;
  }
  get datahoracadastro() {
    return this.#datahoracadastro;
  }
};
