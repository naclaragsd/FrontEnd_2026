const botao = document.getElementById("calcular");

botao.addEventListener("click", function () {
  const bandeira = document.getElementById("bandeira").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const parcelas = parseInt(document.getElementById("parcelas").value);
  const resultado = document.getElementById("resultado");

  let taxa = 0;

  switch (bandeira) {
    case "visa":
      taxa = valor * 0.02;
      break;

    case "master":
      taxa = valor * 0.0185;
      break;

    case "elo":
      taxa = valor * 0.03;
      break;
  }

  let juros = valor * (0.015 * parcelas);
  let taxaMensal = parcelas * 12.5;
  let valorTotal = valor + taxa + juros + taxaMensal;
  let valorParcela = valorTotal / parcelas;

  resultado.innerText =
    "Taxa da bandeira: R$ " +
    taxa.toFixed(2) +
    "\nJuros: R$ " +
    juros.toFixed(2) +
    "\nTaxa mensal: R$ " +
    taxaMensal.toFixed(2) +
    "\nValor total: R$ " +
    valorTotal.toFixed(2) +
    "\nValor de cada parcela: R$ " +
    valorParcela.toFixed(2);
});
