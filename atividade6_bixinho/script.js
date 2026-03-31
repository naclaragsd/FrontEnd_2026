/* const cria variável, variáveis das imagens: */
const cria = document.getElementById("mainImage");
const btn = document.getElementById("btnImage");
const ferlini = document.getElementById("ferlini");

/* variável de fundo */
const fundoDia = "fundo_.png";
const fundoNoite = "fundo_noite.png";
const fundoTriste = "fundo_triste.png";

const estrelasContainer = document.getElementById("estrelas");

/* objeto: estrutura que guarda chave + valor
ou seja: modos do bixinho */
const estados = {
  normal: "bixinho.png",
  bravo: "bixinho_2.png",
  morto: "bixinho___4.png",
  comendo: "bixinho__3.png",
  fofo: "bixinho_1.png",
};

/* let cria variável que pode mudar, 
serve para contar cliques, tempo... */
let contador = 0;
let intervalo = null;
let time_click = null;
let time_out = null;

/* const e let são formas de declarar variáveis no js
const: é constante, não pode ser reatribuída, o conteúdo pode mudar se for objeto 

  ex: const pessoa = { nome: "Ana" };
      pessoa.nome = "Clara";  
  pode, só não pode: pessoa = {} 

let: pode mudar o valor 
  ex: let contador = 0;
      let contador = 1;
     let contador = 2;   */

/*função é um bloco de código que executa quando quiser

essa função vai criar o sistema do tempo*/
function controlador() {
  /* aqui esta atribuindo valor para let intervalo que criou ali em cima */
  if (intervalo) clearInterval(intervalo);

  intervalo = setInterval(() => {
    contador++;

    /* mostra no console a variável do contador, na frente da string "tempo" */
    console.log("tempo:", contador);

    /* quando chegar em 30 segundos ele fica bravo */
    if (contador == 30) {
      cria.src = estados.bravo;
    }

    /* 60s vai mudar para a imagem morto e coloca fundo triste*/
    if (contador == 60) {
      cria.src = estados.morto;
      document.body.classList.add("fundoTriste");
    }

    /* a função vai usar intervalo para guardar um 
    setinterval (executa repetidamente) na qual a cada 
    1000 milisegundos = 1 segundo; Então vai incrementar contador++
    e dependendo do valor, o estado do bixinho vai mudar */
  }, 1000);
}

/* função para quando clicar no cookie */
function alimentar() {
  document.body.classList.remove("fundoTriste");
  cria.src = estados.comendo;
  contador = 0;

  moverCookie();

  /* só para o debug */
  console.log("comeu");

  /* evita bug de multiplos cliques */
  if (time_click) clearTimeout(time_click);

  /* depois de 900ms estado fofo */
  time_click = setTimeout(() => {
    cria.src = estados.fofo;

    /* depois de 1s volta ao normal */
    time_out = setTimeout(() => {
      cria.src = estados.normal;
    }, 1000);
  }, 900);
}

/* adiciona evento */
const toggle = document.getElementById("toggleTema");

/* vai detectar mudança no toggle 
se o botão mudar vai ligar/desligar o modo noite*/
toggle.addEventListener("change", () => {
  document.body.classList.toggle("noite");
});

/* estrelas */
for (let i = 0; i < 100; i++) {
  const estrela = document.createElement("div");
  estrela.classList.add("estrela");

  /*posição aleatoria das estrelas */
  estrela.style.top = Math.random() * 100 + "%";
  estrela.style.left = Math.random() * 100 + "%";
  /*--delay variável que recebe tempo aleatorio entre 0 e 2s */
  estrela.style.setProperty("--delay", Math.random() * 2 + "s");

  /* tempo que a animação vai durar */
  estrela.style.animationDuration = Math.random() * 2 + 1 + "s";

  /* adiciona as estrelas na tela */
  estrelasContainer.appendChild(estrela);
}

/* controla movimento do cookie */
function moverCookie() {
  /* largura da tela em px */
  const larguraTela = window.innerWidth;
  const alturaTela = window.innerHeight;

  /* pega numero entre 0 e 1, multiplica pela largura da tela
  para cookie não sair da tela */
  const x = Math.random() * (larguraTela - btn.offsetWidth);
  const y = Math.random() * (alturaTela - btn.offsetHeight);

  /* move para posição horizontal ou vertical */
  btn.style.left = x + "px";
  btn.style.top = y + "px";
}

/* nome muda em tempo real */
const inputNome = document.getElementById("inputNome");
const nomeBixinho = document.getElementById("nomeBixinho");

/*evento que acontece toda vez que digita ou apaga algo */
inputNome.addEventListener("input", () => {
  if (inputNome.value.trim() === "") {
    nomeBixinho.textContent = "Seu bixinho 🐾";
  } else {
    nomeBixinho.textContent = inputNome.value;
  }
  /* se estiver digitando algo dentro da caixa, vai mostrar em tempo real,
  se nao, vai mostrar "seu bixinho" */
});

/* botão secreto */
let cliquesSecretos = 0;

/* evento de clique */
cria.addEventListener("click", () => {
  cliquesSecretos++;

  /* depois de apertar 5 vezes no bixinho,
  vai mostrar hidden que é algo escondido */
  if (cliquesSecretos === 5) {
    ferlini.classList.remove("hidden");
  }
});

controlador();
moverCookie();
