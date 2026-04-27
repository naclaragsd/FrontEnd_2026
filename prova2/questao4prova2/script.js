function add() {
  document.getElementById("Cards").innerHTML += `
    <div class="card" style="width: 22rem; margin-left: 15px;">
      <img src="img/Lucas_Paqueta.png" class="card-img-top" alt="Jogador">

      <div class="card-body">
        <h5 class="card-title">
          Lucas Tolentino
          <span class="badge text-bg-secondary">8,8</span>
        </h5>

        <p class="card-text">
          <strong>📅 Data de Nascimento:</strong> 27/08/1997 (28 anos)<br>
          <strong>📏 Altura:</strong> 1,80 m<br>
          <strong>🏃 Posição:</strong> Meio-campista
        </p>
      </div>
    </div>
  `;
}
