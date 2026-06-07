/*IMPORTS: React já está disponível como variável
  global pq carregamos o CDN no HTML. Aqui só "desestruturamos"
  as funções que vamos usar. */
const { useState, useEffect, useCallback } = React;
const { createRoot } = ReactDOM;

//CONSTANTES: valores fixos que não mudam durante o jogo
const GRID_SIZE = 20; // o tabuleiro tem 20 colunas e 20 linhas = 400 células
const CELL_SIZE = 20; //cada célula tem 20px de largura e altura

// A cobra começa com 3 segmentos, no meio do tabuleiro,
// posicionados lado a lado na horizontal (y=10 fixo, x varia)
const INITIAL_SNAKE = [
  { x: 10, y: 10 }, // cabeça
  { x: 9, y: 10 },  // corpo
  { x: 8, y: 10 },  // rabo
];

// Direção inicial: movendo para a direita (x+1, y não muda)
// x: 1  → vai para a direita
// x: -1 → vai para a esquerda
// y: 1  → vai para baixo
// y: -1 → vai para cima

const INITIAL_DIR = { x: 1, y: 0 };

// FUNÇÃO AUXILIAR: gerar posição aleatória para a comida
// Recebe o array da cobra para garantir que a comida
// não apareça em cima de nenhum segmento dela
function generateFood(snake) {
  let pos;
  do {
    // Sorteia coordenadas aleatórias dentro do grid (0 a 19)
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
     // Repete o sorteio enquanto a posição sorteada coincidir
     // com qualquer parte do corpo da cobra
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
}

// COMPONENTE PRINCIPAL: SnakeGame
// Aqui fica todo o estado e a lógica do jogo
function SnakeGame() {

  // --- ESTADO DO JOGO ---
  // useState(valorInicial) retorna [valorAtual, funçãoParaAtualizar]
  // Sempre que o estado muda, o React re-renderiza o componente

  const [snake, setSnake] = useState(INITIAL_SNAKE); // array de segmentos
  const [food, setFood] = useState({ x: 15, y: 10 }); // posição da comida
  const [direction, setDirection] = useState(INITIAL_DIR); // direção atual
  const [gameOver, setGameOver] = useState(false);// true = jogo encerrado
  const [score, setScore] = useState(0); // pontuação
  const [started, setStarted] = useState(false); // false = aguardando input

  // useCallback: memoriza a função para ela não ser recriada
  // a cada render. Isso é necessário porque moveSnake é
  // usada como dependência do useEffect do loop, sem isso,
  // o effect rodaria em loop infinito.

  const moveSnake = useCallback(() => {
    // Se o jogo acabou ou ainda não começou, não faz nada
    if (gameOver || !started) return;

    // setSnake recebe uma função (prev => ...) para garantir
    // que estamos sempre usando o valor mais recente da cobra
    setSnake(prev => {
      const head = prev[0]; // pega a cabeça atual (primeiro elemento)
      // Calcula a nova posição da cabeça somando a direção
      // Ex: head={x:10,y:10} + direction={x:1,y:0} → newHead={x:11,y:10}
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      // Colisão com parede
      // Se a nova cabeça saiu dos limites do grid (0 a 19), game over
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prev;
      }

      // Colisão com o próprio corpo
      if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
        setGameOver(true);
        return prev;
      }

      // Comeu a comida
      // Checa se a nova cabeça está na mesma posição da comida
      const ateFood = newHead.x === food.x && newHead.y === food.y;
      // MOVIMENTO DA COBRA (imutável: cria novo array, nunca modifica o original)
      const newSnake = ateFood
        ? [newHead, ...prev]   // comeu: adiciona cabeça E mantém o rabo (cresce)
        : [newHead, ...prev.slice(0, -1)]; //não comeu: adiciona cabeça E remove o rabo (move)

        // SE COMEU: atualiza score e gera nova comida
      if (ateFood) {
        setScore(s => s + 10);// +10 pontos
        setFood(generateFood(newSnake)); // nova comida fora da cobra
      }

      return newSnake; // atualiza o estado da cobra
    });

    // As dependências do useCallback: a função é recriada
  // somente quando algum desses valores mudar
  }, [direction, food, gameOver, started]);

  // Loop do jogo
  // useEffect roda depois de cada render.
  // Aqui criamos um intervalo que chama moveSnake a cada 150ms
  // → isso cria o movimento contínuo da cobra
  //
  // A função de retorno (cleanup) limpa o intervalo quando
  // o componente é desmontado ou quando moveSnake muda
  useEffect(() => {
    const interval = setInterval(moveSnake, 150);// 150ms ≈ ~6 frames por segundo
    return () => clearInterval(interval);// limpa o timer anterior
  }, [moveSnake]);// roda de novo sempre que moveSnake mudar

  // Controles de teclado
  // handleKeyDown é chamada sempre que o usuário pressiona
  // uma tecla. useCallback evita que ela seja recriada
  // desnecessariamente.

  const handleKeyDown = useCallback((e) => {

    // Se ainda não começou, qualquer seta inicia o jogo
    if (!started) setStarted(true);

    // Mapa de tecla → direção
    const map = {
      ArrowUp:    { x: 0,  y: -1 }, // seta cima → y diminui
      ArrowDown:  { x: 0,  y: 1  },// seta baixo → y aumenta
      ArrowLeft:  { x: -1, y: 0  },// seta esquerda → x diminui
      ArrowRight: { x: 1,  y: 0  },// seta direita → x aumenta
    };

    // Se a tecla pressionada não é uma seta, ignora
    if (!map[e.key]) return;
    // Evita que a página role ao pressionar as setas
    e.preventDefault();
    setDirection(prev => {
      const next = map[e.key];
      // IMPEDE REVERSÃO DE 180°: não deixa ir para a direção oposta
      // Ex: se está indo para a direita (x:1), não pode ir para a esquerda (x:-1)
      // Matematicamente: next.x === -prev.x E next.y === -prev.y
      if (next.x === -prev.x && next.y === -prev.y) return prev;
      return next; // muda a direção
    });
  }, [started]);

  // Registra e remove o listener de teclado no DOM
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // REINICIAR O JOGO
  // Reseta todos os estados para os valores iniciais
  function restart() {
    const newSnake = INITIAL_SNAKE;
    setSnake(newSnake);
    setFood(generateFood(newSnake)); // nova comida aleatória
    setDirection(INITIAL_DIR);
    setGameOver(false);
    setScore(0);
    setStarted(false);
  }

   // RENDERIZAÇÃO DO GRID
  // Criamos um array de 400 divs (20x20).
  // Para cada célula verificamos se é cabeça, corpo ou comida
  // e aplicamos a classe CSS correspondente.
  const cells = [];
  for (let y = 0; y < GRID_SIZE; y++) {  // percorre as linhas
    for (let x = 0; x < GRID_SIZE; x++) {// percorre as colunas
      const isHead = snake[0].x === x && snake[0].y === y;// é a cabeça?
      const isBody = !isHead && snake.some(s => s.x === x && s.y === y);// é corpo?
      const isFood = food.x === x && food.y === y;//é comida?

      // Começa com a classe base "cell" e adiciona conforme o tipo
      let cls = "cell";
      if (isHead) cls += " head";
      else if (isBody) cls += " body";
      else if (isFood) cls += " food";

      // key={`${x}-${y}`} é obrigatório no React para listas —
      // ajuda o React a identificar cada elemento unicamente
      cells.push(<div key={`${x}-${y}`} className={cls} />);
    }
  }

  // JSX — o que o componente renderiza na tela

  return (
    <div className="wrapper">
      <h1 className="title">🐍 Snake</h1>
      <div className="score">Score: {score}</div>

       {/* O tabuleiro: CSS Grid com 20 colunas de 20px cada */}

      <div className="board" style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`, // "repeat(20, 20px)"
        width: GRID_SIZE * CELL_SIZE, // 400px de largura total
      }}>
        {cells} {/* as 400 divs geradas acima */}

        {/* Overlay de "pressione para começar" — só aparece antes de iniciar */}
        {!started && !gameOver && (
          <div className="overlay">
            <p>Pressione qualquer seta para começar</p>
          </div>
        )}

        {/* Overlay de Game Over — só aparece quando gameOver = true */}
        {gameOver && (
          <div className="overlay">
            <p>Game Over!</p>
            <p className="final-score">Score: {score}</p>
            <button className="btn" onClick={restart}>Jogar de novo</button>
          </div>
        )}
      </div>

      <p className="hint">Use as setas do teclado ↑ ↓ ← →</p>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<SnakeGame />);