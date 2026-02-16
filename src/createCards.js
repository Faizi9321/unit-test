export function createCards({ suits, values }) {
  if (!Array.isArray(suits) || !Array.isArray(values)) {
    throw new TypeError("Suits and values must be arrays");
  }

  if (suits.length !== 4 || values.length !== 13) {
    throw new RangeError(
      "Suits array must have 4 elements and values array must have 13 elements",
    );
  }

  if (new Set(suits).size !== suits.length) {
    throw new Error("Suits array contains duplicate values");
  }

  if (new Set(values).size !== values.length) {
    throw new Error("Values array contains duplicate values");
  }

  const cards = [];
  for (const suit of suits) {
    for (const value of values) {
      cards.push({ suit, value });
    }
  }
  return cards;
}
