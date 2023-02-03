import _ from "underscore";
/**
 * Esta función crea un nuevo deck
 * @param {array<String>} tiposEspeciales Ejemplo ["A", "J", "Q", "K"]
 * @param {array<String>} tiposDeCarta  Ejemplo ["C", "D", "H", "S"]
 * @returns {array<String>} retorna un nuevo deck de carta
 */
export const crearDeck = (tiposDeCarta, tiposEspeciales) => {
  if (!tiposDeCarta || tiposDeCarta.length === 0)
    throw new Error("TiposDeCarta tiene que ser un arreglo de string");
    if (!tiposEspeciales || tiposEspeciales.length === 0)
    throw new Error("TiposEspeciales tiene que ser un arreglo de string");

  let deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tiposDeCarta) {
      deck.push(i + tipo);
    }
  }
  for (let tipo of tiposDeCarta) {
    for (let esp of tiposEspeciales) {
      deck.push(esp + tipo);
    }
  }
  return _.shuffle(deck);
};

//export default crearDeck
