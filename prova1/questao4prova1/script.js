function revelar() {
  document.getElementById("jogador").src = "img/_vinicius_junior.png";

  document.getElementById("Nome").textContent = "Vinícius Júnior";
  document.getElementById("Rank").textContent = "9,5";

  document.getElementById("Data_Nas").innerHTML =
    "<strong>📅 Data de Nascimento:</strong> 12/07/2000 (25 anos)";
  document.getElementById("Altura").innerHTML =
    "<strong>📏 Altura:</strong> 1,76 m";
  document.getElementById("Posicao").innerHTML =
    "<strong>🏃 Posição: </strong>Ponta-esquerda / Atacante";

  document.querySelectorAll(".placeholder").forEach(function (elemento) {
    elemento.classList.remove("placeholder");
  });

  document.getElementById("Data_Nas").classList.add("card-text");
  document.getElementById("Altura").classList.add("card-text");
  document.getElementById("Posicao").classList.add("card-text");
}
