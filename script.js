function adicionarMusica() {
  const input = document.getElementById("input-musica");
  const valor = input.value.trim();

  if (valor === "") {
    alert("Digite o nome de uma música!");
    return;
  }

  const lista = document.getElementById("lista-musicas");
  const item = document.createElement("li");
  item.textContent = valor;
  lista.appendChild(item);

  input.value = "";
}