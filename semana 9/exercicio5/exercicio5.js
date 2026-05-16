const input = document.getElementById("nomeConvidado");
const botaoAdd = document.getElementById("btnAdd");
const lista = document.getElementById("listaConvidados");
let convidados = [];

botaoAdd.addEventListener("click", adicionarConvidado);

function adicionarConvidado() {
  const nome = input.value.trim();

  if (nome === "") {
    alert("digite um nome válido!");
    return;
  }

  convidados.push(nome);
  criarElemento(nome);
  input.value = "";
}

function criarElemento(nome) {
  const li = document.createElement("li"); //cria li

  const span = document.createElement("span"); //cria o texto
  span.textContent = nome;

  const divBotoes = document.createElement("div");
  divBotoes.classList.add("botoes");

  const btnConcluir = document.createElement("button");
  btnConcluir.textContent = "concluir";

  btnConcluir.addEventListener("click", function () {
    span.classList.toggle("riscado");
  });

  //botao editar
  const btnEditar = document.createElement("button");
  btnEditar.textContent = "editar";

  btnEditar.addEventListener("click", function () {
    const novoNome = prompt("digite o novo nome:");

    if (novoNome !== null && novoNome.trim() !== "") {
      span.textContent = novoNome.trim();
    }
  });

  //botao excluir
  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "excluir";

  btnExcluir.addEventListener("click", function () {
    li.remove();
  });

  //add botoes na div
  divBotoes.appendChild(btnConcluir);
  divBotoes.appendChild(btnEditar);
  divBotoes.appendChild(btnExcluir);

  //add no li
  li.appendChild(span);
  li.appendChild(divBotoes);

  //add na lista
  lista.appendChild(li);
}
