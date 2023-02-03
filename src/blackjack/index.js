import { crearDeck, pedirCarta, valorCarta } from "../usecases";

let deck = [];
const tipos = ["C", "D", "H", "S"],
  especiales = ["A", "J", "Q", "K"];

let puntosJugadores = [],
  puntosJugadoresSecundarios = [];

let barajear = new Audio("assets/audios/shuffling-cards.mp3");
let repartir = new Audio("assets/audios/repartir.mp3");

// Referencias del HTML
const btnPedir = document.querySelector("#btnPedir"),
  btnNuevo = document.querySelector("#btnNuevo"),
  btnDetener = document.querySelector("#btnDetener"),
  puntosHtlm = document.querySelectorAll("small"),
  divCartasJugadores = document.querySelectorAll(".divCartas");

//Esta función inicializa el juego el ultimo jugador es la computadora
const inicializarJuego = async (numJugadores = 2) => {
  puntosJugadores = [];
  puntosJugadoresSecundarios = [];
  for (let i = 0; i < numJugadores; i++) {
    puntosJugadores.push(0);
    puntosJugadoresSecundarios.push(0);
    puntosHtlm[i].innerText = "";
    divCartasJugadores[i].innerHTML = "";
  }
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  btnNuevo.disabled = true;
  deck = crearDeck(tipos, especiales);
  barajear.play();
  await new Promise((r) => setTimeout(r, barajear.duration * 1100));
  btnPedir.click();
  await sacarCartaComp();
  btnNuevo.disabled = false;
  btnDetener.disabled = false;
};

//turno: 0 = primer jugar y el último sera la computadora
const acumularPuntos = (valor, turno) => {
  puntosJugadores[turno] += valor;
  puntosJugadoresSecundarios[turno] += valor === 11 ? 1 : valor;

  puntosJugadores[turno] =
    puntosJugadores[turno] > 21
      ? puntosJugadoresSecundarios[turno]
      : puntosJugadores[turno];

  puntosHtlm[turno].innerText =
    puntosJugadores[turno] !== puntosJugadoresSecundarios[turno]
      ? `${puntosJugadoresSecundarios[turno]} / ${puntosJugadores[turno]}`
      : puntosJugadores[turno];

  return puntosJugadores[turno];
};

const crearCarta = (carta, turno) => {
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugadores[turno].append(imgCarta);
};

const determinarGanador = async (puntosComputadora, puntosMinimos) => {
  await new Promise((r) => setTimeout(r, 500));
  if (
    puntosComputadora > 21 ||
    (puntosComputadora < puntosMinimos && puntosMinimos < 22)
  )
    alert("Haz ganado :D");
  else if (
    puntosMinimos > 21 ||
    (puntosComputadora > puntosMinimos && puntosComputadora < 22)
  )
    alert("Lo siento haz perdido");
  else alert("¡Empate!");
};

const turnoComputadora = async (puntosMinimos) => {
  do {
    await sacarCartaComp();
  } while (
    puntosJugadores[puntosJugadores.length - 1] < puntosMinimos &&
    puntosMinimos <= 21
  );

  const puntosComputadora = puntosJugadores[puntosJugadores.length - 1];
  determinarGanador(puntosComputadora, puntosJugadores[0]);
};

const sacarCartaComp = () => {
  return new Promise(async function (resolve, reject) {
    repartir.play();
    await new Promise((r) => setTimeout(r, repartir.duration * 1100));
    const carta = pedirCarta(deck);
    const valor = valorCarta(
      carta,
      puntosJugadores.length - 1,
      puntosJugadores
    );
    acumularPuntos(valor, puntosJugadores.length - 1);
    crearCarta(carta, puntosJugadores.length - 1);
    resolve();
  });
};

//Eventos
btnPedir.addEventListener("click", async () => {
  repartir.play();
  await new Promise((r) => setTimeout(r, repartir.duration * 1100));
  const carta = pedirCarta(deck);
  const valor = valorCarta(carta, 0, puntosJugadores);
  const puntosJugador = acumularPuntos(valor, 0);
  crearCarta(carta, 0);

  if (puntosJugador > 21 || puntosJugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnNuevo.addEventListener("click", () => {
  inicializarJuego();
});

btnDetener.addEventListener("click", () => {
  turnoComputadora(puntosJugadores[0]);
  btnPedir.disabled = true;
  btnDetener.disabled = true;
});
