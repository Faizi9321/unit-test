import {describe, it, expect} from 'vitest';
import {createCards} from '../src/createCards';
import {shuffle} from '../src/shuffle';

describe('shuffle', () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    it('randomizes the order of a standard deck of cards', () => {
        const cards = createCards({suits, values});
        const orginalCards = [...cards];
        const shuffledCards = shuffle(cards);

        const samePosition = shuffledCards.filter((card, index) => card === orginalCards[index]);
        expect(samePosition.length).toBeLessThan(52);
    })

    it('does not change the length of the deck', () => {
        const cards = createCards({suits, values});
        const shuffledCards = shuffle(cards);
        expect(shuffledCards.length).toBe(cards.length);
    });
});