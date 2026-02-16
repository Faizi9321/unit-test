import { describe, it, expect } from "vitest";
import { createCards } from "../src/createCards";

describe("createCards", () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  it("it should return array of cards", () => {
    const cards = createCards({ suits, values });

    expect(Array.isArray(cards)).toBe(true);
    expect(cards).toHaveLength(52);
  });

  it("it should return correct cards", () => {
    const suits = ["hearts", "diamonds"];
    const values = ["2", "3"];

    expect(() => createCards({ suits, values })).toThrow(/4/);
  });

  it("throw and error if suits or values are not standard lengths", () => {
    expect(() => createCards({ suits: ["Hearts"], values })).toThrow(/4/);
    expect(() => createCards({ suits, values: ["1", "2"] })).toThrow(/13/);
  });

  it("throw an error if suits or values are not arrays", () => {
    const suits = "hearts, diamonds";
    const values = "2, 3";
    expect(() => createCards({ suits, values })).toThrow();
    expect(() => createCards({ suits: [], values })).toThrow();
  });

  it("create card object with correct properties", () => {
    const cards = createCards({ suits, values });
    const card = cards[0];
    expect(card).toHaveProperty("suit");
    expect(card).toHaveProperty("value");
    expect(suits).toContain(card.suit);
    expect(values).toContain(card.value);
  });

  it("create combination of suits and values correctly", () => {
    const cards = createCards({ suits, values });
    const expectedCard = { suit: "hearts", value: "2" };
    expect(cards).toContainEqual(expectedCard);
  });

  it("throw an error for duplicate suits or values", () => {
    const suits = ["hearts", "diamonds", "clubs", "hearts"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    expect(() => createCards({ suits, values })).toThrow();
  });
});
