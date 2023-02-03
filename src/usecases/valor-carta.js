/**
 * Recibe una carta y el turno del jugador para hacer las cuentas
 * @param {String} carta
 * @param {Number} turno
 * @param {Array<Number>} puntosJugadores
 * @returns {Number}
 */

export const valorCarta = (carta, turno, puntosJugadores) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor)
    ? valor === "A"
      ? puntosJugadores[turno] > 10
        ? 1
        : 11
      : 10
    : valor * 1;
};
