//procura elementos do HTML usando o id
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

//função que será executada ao clicar no botão
function addTask(){

  const taskText = taskInput.value.trim(); /* taskInput.value pega o que o usuário digitou
                                              .trim remove espaços vazios no começo e fim */

  if(taskText !== ''){ // se o texto não estiver vazio, vai exxecutar: 

    const newItem = document.createElement('li'); //cria li novo na memória mas sem aparecer na tela
    
//adiciona conteúdo dentro do <li>
    newItem.innerHTML = `<span>${taskText}</span> 
    <button onclick="editar(this)">Editar</button>
    <button onclick="delet(this)">Remover</button>
    <button onclick="completar(this)">Feito</button>`;
  taskList.appendChild(newItem);
  taskInput.value = '';

/* taskText: coloca a variável dentro do HTML
   appendChild: Pega o <li> criado e coloca dentro da <ul>
   taskInput.value = ''; : o campo fica vazio, para o 
   usuário poder adicionar outra tarefa 
*/
    }
}

function editar(button){
//adicionar (this) no button
 const li = button.parentElement; //pega o li
    const span = li.querySelector('span'); /*procura dentro do li um 
                                            elemento span que reppresenta
                                            o texto da tarefa */

    const novoTexto = prompt('Editar tarefa:', span.innerText);
  /* prompt: abre caixinha no navegador 
     span.innerText: coloca texto atual já preenchido */

    if(novoTexto !== ''){ //verifica se não ficou vazio
        span.innerText = novoTexto;
        //troca o texto antigo pelo novo
    }
}

function delet(button){
//adicionar (this) no button

button.parentElement.remove();
/*
recebe o elemento clicado, pega o elemento pai do botão e remove
o elemento da tela 
*/
}

function completar(button){ //o parâmetro button recebe o botão clicado
/*
adicionar (this) no button assim:
      <button onclick="completar(this)">Feito</button> 
o botão vai enviar ele mesmo para a função
o (this) significa: esse elemento aqui que foi clicado
*/

button.parentElement.classList.toggle('completed');
/*
button.parentElement: botão está dentro do <li>, ou seja, o elemento
pai do botão é <li> 
.classList: mexe nas classes do CSS
toggle('completed'): se não estiver com a classe, ele adiciona,
se estiver com a classe, ele remove; Ou seja, no primeiro clique,
fica riscado, no segundo clique remove o riscado
*/
}