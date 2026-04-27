function proximo() {
  // Grupo D
  document.querySelector("#grupoA h2").textContent = "🅳 Grupo D";

  let listaA = document.querySelectorAll("#grupoA li");
  listaA[0].textContent = "Estados Unidos";
  listaA[1].textContent = "Paraguai";
  listaA[2].textContent = "Austrália";
  listaA[3].textContent = "Turquia";

  document.querySelector("#grupoA details p").textContent =
    "Os EUA jogam em casa, vantagem histórica em Copas. Austrália enfrenta frequentemente seleções sul-americanas em torneios.";

  // Grupo E
  document.querySelector("#grupoB h2").textContent = "🅴 Grupo E";

  let listaB = document.querySelectorAll("#grupoB li");
  listaB[0].textContent = "Alemanha";
  listaB[1].textContent = "Equador";
  listaB[2].textContent = "Costa do Marfim";
  listaB[3].textContent = "Curaçao";

  document.querySelector("#grupoB details p").textContent =
    "Alemanha costuma dominar fases de grupos. Equador e Costa do Marfim têm estilos físicos semelhantes.";

  // Grupo F
  document.querySelector("#grupoC h2").textContent = "🅵 Grupo F";

  let listaC = document.querySelectorAll("#grupoC li");
  listaC[0].textContent = "Holanda";
  listaC[1].textContent = "Japão";
  listaC[2].textContent = "Tunísia";
  listaC[3].textContent = "Suécia";

  document.querySelector("#grupoC details p").textContent =
    "Holanda e Suécia possuem tradição em Copas. Japão cresce cada vez mais no cenário mundial.";
}
