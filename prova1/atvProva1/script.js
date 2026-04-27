function mostrarTabela() {
  let imagem = document.createElement("img");

  imagem.src = "Tabela_Jogos.png";

  imagem.alt = "Tabela de Jogos da Copa do Mundo";
  imagem.width = 600;
  imagem.style.display = "block";
  imagem.style.margin = "30px auto";

  document.body.appendChild(imagem);
}

function revelar() {
  // alterar a imagem principal
  document.querySelector(".card-img-top").src = "img/_vinicius_junior.png";

  // pegar os elementos pelos IDs que a professora colocou
  let nome = document.getElementById("Nome");
  let rank = document.getElementById("Rank");
  let dataNas = document.getElementById("Data_Nas");
  let altura = document.getElementById("Alutra");
  let posicao = document.getElementById("Posição ");

  // substituir os conteúdos
  nome.innerHTML =
    'Vinícius José Paixão de Oliveira Júnior <span id="Rank" class="badge text-bg-secondary">9,5</span>';

  dataNas.textContent = "12/07/2000 (25 anos)";
  altura.textContent = "1,76 m";
  posicao.textContent = "Ponta-esquerda / Atacante";

  // remover placeholder
  dataNas.classList.remove("placeholder");
  altura.classList.remove("placeholder");
  posicao.classList.remove("placeholder");

  // aplicar card-text
  dataNas.classList.add("card-text");
  altura.classList.add("card-text");
  posicao.classList.add("card-text");
}
