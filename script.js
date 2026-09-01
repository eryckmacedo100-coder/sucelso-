const form = document.getElementById("form-musica");
const input = document.getElementById("input-musica");
const lista = document.getElementById("lista-musicas");
const contador = document.getElementById("track-count");
const hint = document.getElementById("hint");
const record = document.getElementById("record");

function atualizarContador() {
  const total = lista.children.length;
  contador.textContent = `${total} faixa${total === 1 ? "" : "s"}`;
}

function adicionarFaixa(texto) {
  const partes = texto.split("-").map(p => p.trim());
  const titulo = partes[0] || texto;
  const artista = partes[1] || "";

  const li = document.createElement("li");

  const spanTitulo = document.createElement("span");
  spanTitulo.className = "track-title";
  spanTitulo.textContent = titulo;

  const spanArtista = document.createElement("span");
  spanArtista.className = "track-artist";
  spanArtista.textContent = artista;

  li.appendChild(spanTitulo);
  li.appendChild(spanArtista);
  lista.appendChild(li);

  atualizarContador();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = input.value.trim();

  if (valor === "") {
    hint.textContent = "Escreva o nome de uma música antes de adicionar.";
    return;
  }

  adicionarFaixa(valor);
  input.value = "";
  hint.textContent = "";

  // dá um giro rápido no disco como feedback
  record.classList.add("playing");
  setTimeout(() => record.classList.remove("playing"), 2500);
});

// disco gira suavemente ao passar o mouse
record.addEventListener("mouseenter", () => record.classList.add("playing"));
record.addEventListener("mouseleave", () => record.classList.remove("playing"));

document.getElementById("ano").textContent = new Date().getFullYear();
atualizarContador();
