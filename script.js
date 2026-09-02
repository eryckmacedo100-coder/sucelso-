// --- dados iniciais: músicas de estilos variados ---
let musicas = [
  { titulo: "Águas de Março", artista: "Elis Regina & Tom Jobim", genero: "MPB", fav: false },
  { titulo: "Como Nossos Pais", artista: "Elis Regina", genero: "MPB", fav: false },
  { titulo: "Comida", artista: "Titãs", genero: "Rock", fav: false },
  { titulo: "Todo Amor Que Houver Nessa Vida", artista: "Legião Urbana", genero: "Rock", fav: false },
  { titulo: "Vai Passar", artista: "Zeca Pagodinho", genero: "Samba", fav: false },
  { titulo: "Mas Que Nada", artista: "Jorge Ben Jor", genero: "Samba", fav: false },
  { titulo: "Asa Branca", artista: "Luiz Gonzaga", genero: "Forró", fav: false },
  { titulo: "Esperando na Janela", artista: "Falamansa", genero: "Forró", fav: false },
  { titulo: "No Woman, No Cry", artista: "Bob Marley", genero: "Reggae", fav: false },
  { titulo: "Chame o Síndico", artista: "Bezerra da Silva", genero: "Funk", fav: false },
  { titulo: "É o Poder", artista: "MC Marcinho", genero: "Funk", fav: false },
  { titulo: "Take Five", artista: "Dave Brubeck", genero: "Jazz", fav: false },
  { titulo: "Blinding Lights", artista: "The Weeknd", genero: "Pop", fav: false },
  { titulo: "Strobe", artista: "deadmau5", genero: "Eletrônica", fav: false },
  { titulo: "Negro Drama", artista: "Racionais MC's", genero: "Rap", fav: false },
  { titulo: "Evidências", artista: "Chitãozinho & Xororó", genero: "Sertanejo", fav: false },
  { titulo: "Garota de Ipanema", artista: "Tom Jobim & Vinícius de Moraes", genero: "Bossa Nova", fav: false },
  { titulo: "É D'Oxum", artista: "Daniela Mercury", genero: "Axé", fav: false },
  { titulo: "Anna", artista: "Vitor Kley", genero: "Indie", fav: false }
];

let filtroGenero = "todos";
let termoBusca = "";
let apenasFavoritas = false;

const lista = document.getElementById("lista-musicas");
const contador = document.getElementById("track-count");
const tabsWrap = document.getElementById("genre-tabs");
const form = document.getElementById("form-musica");
const input = document.getElementById("input-musica");
const selectGenero = document.getElementById("select-genero");
const hint = document.getElementById("hint");
const record = document.getElementById("record");
const busca = document.getElementById("busca");
const favToggle = document.getElementById("fav-toggle");
const btnSorteio = document.getElementById("btn-sorteio");
const sorteioCard = document.getElementById("sorteio-card");
const sorteioMusica = document.getElementById("sorteio-musica");
const sorteioFechar = document.getElementById("sorteio-fechar");

function generosUnicos() {
  return [...new Set(musicas.map(m => m.genero))].sort();
}

function renderTabs() {
  const generos = generosUnicos();
  tabsWrap.innerHTML = "";

  const btnTodos = document.createElement("button");
  btnTodos.className = "genre-tab" + (filtroGenero === "todos" ? " active" : "");
  btnTodos.textContent = "Todos";
  btnTodos.addEventListener("click", () => { filtroGenero = "todos"; renderTabs(); renderLista(); });
  tabsWrap.appendChild(btnTodos);

  generos.forEach(g => {
    const btn = document.createElement("button");
    btn.className = "genre-tab" + (filtroGenero === g ? " active" : "");
    btn.textContent = g;
    btn.addEventListener("click", () => { filtroGenero = g; renderTabs(); renderLista(); });
    tabsWrap.appendChild(btn);
  });
}

function musicasFiltradas() {
  return musicas.filter(m => {
    const passaGenero = filtroGenero === "todos" || m.genero === filtroGenero;
    const passaFav = !apenasFavoritas || m.fav;
    const alvo = (m.titulo + " " + m.artista).toLowerCase();
    const passaBusca = alvo.includes(termoBusca.toLowerCase());
    return passaGenero && passaFav && passaBusca;
  });
}

function renderLista() {
  lista.innerHTML = "";
  const filtradas = musicasFiltradas();

  if (filtradas.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "empty-msg";
    vazio.textContent = "Nenhuma faixa encontrada por aqui.";
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

      const actions = document.createElement("span");
      actions.className = "track-actions";

      const btnFav = document.createElement("button");
      btnFav.className = "btn-icon btn-fav" + (m.fav ? " active" : "");
      btnFav.setAttribute("aria-label", "Favoritar");
      btnFav.textContent = m.fav ? "★" : "☆";
      btnFav.addEventListener("click", () => {
        m.fav = !m.fav;
        renderLista();
      });

      const btnRemove = document.createElement("button");
      btnRemove.className = "btn-icon btn-remove";
      btnRemove.setAttribute("aria-label", "Remover");
      btnRemove.textContent = "✕";
      btnRemove.addEventListener("click", () => {
        musicas = musicas.filter(x => x !== m);
        renderTabs();
        renderLista();
      });

      actions.appendChild(btnFav);
      actions.appendChild(btnRemove);

      li.appendChild(titulo);
      li.appendChild(artista);
      li.appendChild(genero);
      li.appendChild(actions);
      lista.appendChild(li);
    });
  }

  contador.textContent = `${musicas.length} faixa${musicas.length === 1 ? "" : "s"}`;
}

// busca
busca.addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderLista();
});

// favoritas
favToggle.addEventListener("click", () => {
  apenasFavoritas = !apenasFavoritas;
  favToggle.classList.toggle("active", apenasFavoritas);
  renderLista();
});

// adicionar música
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const valor = input.value.trim();

  if (valor === "") {
    hint.textContent = "Escreva o nome de uma música antes de adicionar.";
    return;
  }

  const partes = valor.includes("—") ? valor.split("—") : valor.split("-");
  const titulo = partes[0].trim();
  const artista = (partes[1] || "").trim() || "Artista desconhecido";
  const genero = selectGenero.value;

  musicas.push({ titulo, artista, genero, fav: false });

  input.value = "";
  hint.textContent = "";

  filtroGenero = genero;
  renderTabs();
  renderLista();

  record.classList.add("playing");
  setTimeout(() => record.classList.remove("playing"), 2500);
});

// disco gira ao passar o mouse
record.addEventListener("mouseenter", () => record.classList.add("playing"));
record.addEventListener("mouseleave", () => record.classList.remove("playing"));

// sorteio
btnSorteio.addEventListener("click", () => {
  if (musicas.length === 0) return;
  const escolhida = musicas[Math.floor(Math.random() * musicas.length)];
  sorteioMusica.textContent = `${escolhida.titulo} — ${escolhida.artista} (${escolhida.genero})`;
  sorteioCard.hidden = false;
  record.classList.add("playing");
  setTimeout(() => record.classList.remove("playing"), 3000);
});

sorteioFechar.addEventListener("click", () => {
  sorteioCard.hidden = true;
});

document.getElementById("ano").textContent = new Date().getFullYear();

renderTabs();
renderLista();
