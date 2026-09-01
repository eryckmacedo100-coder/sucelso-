// --- dados iniciais: músicas de estilos variados ---
let musicas = [
  { titulo: "Águas de Março", artista: "Elis Regina & Tom Jobim", genero: "MPB" },
  { titulo: "Como Nossos Pais", artista: "Elis Regina", genero: "MPB" },
  { titulo: "Comida", artista: "Titãs", genero: "Rock" },
  { titulo: "Todo Amor Que Houver Nessa Vida", artista: "Legião Urbana", genero: "Rock" },
  { titulo: "Vai Passar", artista: "Zeca Pagodinho", genero: "Samba" },
  { titulo: "Mas Que Nada", artista: "Jorge Ben Jor", genero: "Samba" },
  { titulo: "Asa Branca", artista: "Luiz Gonzaga", genero: "Forró" },
  { titulo: "Esperando na Janela", artista: "Falamansa", genero: "Forró" },
  { titulo: "No Woman, No Cry", artista: "Bob Marley", genero: "Reggae" },
  { titulo: "Chame o Síndico", artista: "Bezerra da Silva", genero: "Funk" },
  { titulo: "É o Poder", artista: "MC Marcinho", genero: "Funk" },
  { titulo: "Take Five", artista: "Dave Brubeck", genero: "Jazz" },
  { titulo: "Blinding Lights", artista: "The Weeknd", genero: "Pop" },
  { titulo: "Strobe", artista: "deadmau5", genero: "Eletrônica" },
  { titulo: "Negro Drama", artista: "Racionais MC's", genero: "Rap" },
  { titulo: "Evidências", artista: "Chitãozinho & Xororó", genero: "Sertanejo" }
];

let filtroAtual = "todos";

const lista = document.getElementById("lista-musicas");
const contador = document.getElementById("track-count");
const tabsWrap = document.getElementById("genre-tabs");
const form = document.getElementById("form-musica");
const input = document.getElementById("input-musica");
const selectGenero = document.getElementById("select-genero");
const hint = document.getElementById("hint");
const record = document.getElementById("record");

function generosUnicos() {
  return [...new Set(musicas.map(m => m.genero))].sort();
}

function renderTabs() {
  const generos = generosUnicos();
  tabsWrap.innerHTML = "";

  const btnTodos = document.createElement("button");
  btnTodos.className = "genre-tab" + (filtroAtual === "todos" ? " active" : "");
  btnTodos.dataset.genre = "todos";
  btnTodos.textContent = "Todos";
  btnTodos.addEventListener("click", () => selecionarFiltro("todos"));
  tabsWrap.appendChild(btnTodos);

  generos.forEach(g => {
    const btn = document.createElement("button");
    btn.className = "genre-tab" + (filtroAtual === g ? " active" : "");
    btn.dataset.genre = g;
    btn.textContent = g;
    btn.addEventListener("click", () => selecionarFiltro(g));
    tabsWrap.appendChild(btn);
  });
}

function selecionarFiltro(genero) {
  filtroAtual = genero;
  renderTabs();
  renderLista();
}

function renderLista() {
  lista.innerHTML = "";

  const filtradas = filtroAtual === "todos"
    ? musicas
    : musicas.filter(m => m.genero === filtroAtual);

  if (filtradas.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "empty-msg";
    vazio.textContent = "Nenhuma faixa nesse estilo ainda.";
    lista.appendChild(vazio);
  } else {
    filtradas.forEach(m => {
      const li = document.createElement("li");

      const titulo = document.createElement("span");
      titulo.className = "track-title";
      titulo.textContent = m.titulo;

      const artista = document.createElement("span");
      artista.className = "track-artist";
      artista.textContent = "— " + m.artista;

      const genero = document.createElement("span");
      genero.className = "track-genre";
      genero.textContent = m.genero;

      li.appendChild(titulo);
      li.appendChild(artista);
      li.appendChild(genero);
      lista.appendChild(li);
    });
  }

  contador.textContent = `${musicas.length} faixa${musicas.length === 1 ? "" : "s"}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = input.value.trim();

  if (valor === "") {
    hint.textContent = "Escreva o nome de uma música antes de adicionar.";
    return;
  }

  const partes = valor.split("—").length > 1
    ? valor.split("—")
    : valor.split("-");

  const titulo = partes[0].trim();
  const artista = (partes[1] || "").trim() || "Artista desconhecido";
  const genero = selectGenero.value;

  musicas.push({ titulo, artista, genero });

  input.value = "";
  hint.textContent = "";

  selecionarFiltro(genero);

  record.classList.add("playing");
  setTimeout(() => record.classList.remove("playing"), 2500);
});

record.addEventListener("mouseenter", () => record.classList.add("playing"));
record.addEventListener("mouseleave", () => record.classList.remove("playing"));

document.getElementById("ano").textContent = new Date().getFullYear();

renderTabs();
renderLista();
