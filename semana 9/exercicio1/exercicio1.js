function validarCPF() {
  const cpf = document.getElementById("cpf").value;
  let soma = 0;
  let peso = 10;

  for (let i = 0; i < 9; i++) {
    let numero = parseInt(cpf[i]);
    soma += numero * peso;
    peso--;
  }

  let digito1 = (soma * 10) % 11;

  if (digito1 === 10) {
    digito1 = 0;
  }

  peso = 11;
  soma = 0;

  for (let i = 0; i < 10; i++) {
    let numero = parseInt(cpf[i]);
    soma += numero * peso;
    peso--;
  }

  let digito2 = (soma * 10) % 11;

  if (digito2 === 10) {
    digito2 = 0;
  }

  const resultado = document.getElementById("resultado");

  if (digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10])) {
    resultado.style.color = "green";
    resultado.innerText = "CPF válido";
  } else {
    resultado.style.color = "red";
    resultado.innerText = "CPF inválido";
  }
}
