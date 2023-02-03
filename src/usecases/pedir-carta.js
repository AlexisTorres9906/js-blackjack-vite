/**
 * Función para pedir carta del deck
 * @param {Array<String>} deck 
 * @returns {String}
 */
export const pedirCarta = (deck) => {
    if (deck.length === 0) throw new Error("No hay cartas en el deck");
    return deck.pop();
  };