const botao = document.getElementById("calcular");

botao.addEventListener("click", function () {
  const nome = document.getElementById("nome").value;
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);
  const resultado = document.getElementById("resultado");
  let media = (nota1 + nota2 + nota3) / 3;

  if (media >= 7 && media <= 10) {
    resultado.innerText = nome + " foi aprovado(a)! Média: " + media.toFixed(2);

    resultado.style.color = "blue";
  } else if (media >= 4 && media < 7) {
    let falta = 10 - media;

    resultado.innerText =
      nome +
      " está de exame. Média: " +
      media.toFixed(2) +
      ". Faltam " +
      falta.toFixed(2) +
      " pontos para chegar em 10.";

    resultado.style.color = "green";
  } else {
    resultado.innerText =
      nome + " foi reprovado(a). Média: " + media.toFixed(2);
    resultado.style.color = "red";
  }
});
