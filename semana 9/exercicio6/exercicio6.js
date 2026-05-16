const pacote = document.getElementById("pacote");
const pessoas = document.getElementById("pessoas");
const botao = document.getElementById("btnCalcular");
const bruto = document.getElementById("bruto");
const taxa = document.getElementById("taxa");
const desconto = document.getElementById("desconto");
const total = document.getElementById("total");

botao.addEventListener("click", calcular);

function calcular() {
  const valorPacote = Number(pacote.value);
  const quantidade = Number(pessoas.value);

  //calculo base
  const custoBruto = valorPacote * quantidade;
  //taxa 10%
  const taxaServico = custoBruto * 0.1;
  //subtotal
  let totalFinal = custoBruto + taxaServico;
  //desconto
  let valorDesconto = 0;

  if (quantidade > 100) {
    valorDesconto = totalFinal * 0.05;
    totalFinal -= valorDesconto;
  }

  bruto.textContent = "custo bruto: R$ " + custoBruto.toFixed(2);

  taxa.textContent = "taxa de serviço: R$ " + taxaServico.toFixed(2);

  desconto.textContent = "desconto: R$ " + valorDesconto.toFixed(2);

  total.textContent = "total final: R$ " + totalFinal.toFixed(2);
}
