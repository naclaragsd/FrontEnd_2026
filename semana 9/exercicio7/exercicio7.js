const input = document.getElementById("cartao");

const botao = document.getElementById("btnAnalisar");

const statusTexto = document.getElementById("status");
const bandeiraTexto = document.getElementById("bandeira");
const setorTexto = document.getElementById("setor");
const bancoTexto = document.getElementById("banco");

botao.addEventListener("click", analisarCartao);

function analisarCartao() {
  // remove espaços e pontos
  const numero = input.value.replace(/\s/g, "").replace(/\./g, "");

  // valida tamanho
  if (numero.length < 13 || numero.length > 16) {
    statusTexto.textContent = "Status: número inválido";

    return;
  }

  // verifica Luhn
  const valido = validarLuhn(numero);

  // descobre bandeira
  const bandeira = descobrirBandeira(numero);

  // setor
  const setor = descobrirSetor(numero);

  // banco fictício
  const banco = descobrirBanco(numero);

  // resultado
  statusTexto.textContent = "Status: " + (valido ? "Válido" : "Inválido");

  bandeiraTexto.textContent = "Bandeira: " + bandeira;

  setorTexto.textContent = "Setor: " + setor;

  bancoTexto.textContent = "Banco Emissor: " + banco;
}

function validarLuhn(numero) {
  let soma = 0;

  let inverter = false;

  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = Number(numero[i]);

    if (inverter) {
      digito *= 2;

      if (digito > 9) {
        digito -= 9;
      }
    }

    soma += digito;

    inverter = !inverter;
  }

  return soma % 10 === 0;
}

function descobrirBandeira(numero) {
  if (numero.startsWith("4")) {
    return "Visa";
  }

  if (
    numero.startsWith("51") ||
    numero.startsWith("52") ||
    numero.startsWith("53") ||
    numero.startsWith("54") ||
    numero.startsWith("55")
  ) {
    return "MasterCard";
  }

  if (numero.startsWith("34") || numero.startsWith("37")) {
    return "American Express";
  }

  return "Desconhecida";
}

function descobrirSetor(numero) {
  const primeiroDigito = numero[0];

  switch (primeiroDigito) {
    case "3":
      return "Turismo e Entretenimento";

    case "4":
    case "5":
      return "Financeiro";

    case "6":
      return "Comércio e Bancos";

    default:
      return "Setor desconhecido";
  }
}

function descobrirBanco(numero) {
  const inicio = numero.substring(0, 2);

  switch (inicio) {
    case "41":
      return "Banco Internacional";

    case "51":
      return "Infinity Bank";

    case "34":
      return "American Finance";

    default:
      return "Banco não identificado";
  }
}
