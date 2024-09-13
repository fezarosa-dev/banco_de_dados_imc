const titulo1 = "Cadastro de Pessoas";
const titulo2 = "Felipe Z. Rosa";
let alternando = true;
let intervalo;

function alternarTitulo() {
  if (alternando) {
    document.title = titulo2;
  } else {
    document.title = titulo1;
  }
  alternando = !alternando;
}

function iniciarAlternancia() {
  intervalo = setInterval(alternarTitulo, 2000);
}

function pararAlternancia() {
  clearInterval(intervalo);
}

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // Quando a página está oculta
    document.title = "Volte Aqui!";
    pararAlternancia(); // Para a alternância do título
  } else {
    // Quando a página está visível novamente
    document.title = titulo1; // Define o título inicial ou o desejado
    iniciarAlternancia(); // Reinicia a alternância do título
  }
});

// Iniciar a alternância quando a página é carregada
iniciarAlternancia();
