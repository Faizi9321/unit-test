import { describe, it, expect } from 'vitest';
import { loadDeck } from '../src/loadDeck';

describe('loadDeck', () => {
    it('returns a promise that resolves to an array of card objects', async () => {
        const deck = loadDeck();
        expect(deck).toBeInstanceOf(Promise);
        await expect(deck).resolves.toBeDefined();
    });

    it('resolves a { suites[4], values[13] } deck', async () => {
        const deck = await loadDeck();

        // non asymmetric test, but at least checks the structure of the deck object
        // expect(typeof deck).toBe('object');
        // expect(deck).toHaveProperty('suits');
        // expect(deck).toHaveProperty('values');
        // expect(Array.isArray(deck.suits)).toBe(true);
        // expect(Array.isArray(deck.values)).toBe(true);
        // expect(deck.suits).toHaveLength(4);
        // expect(deck.values).toHaveLength(13);

        // asymmetric test, but more specific to the standard deck
        expect(deck).toEqual(
            expect.objectContaining({
                suits: expect.arrayContaining(['Hearts', 'Diamonds', 'Clubs', 'Spades']),
                values: expect.arrayContaining(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'])
            })
        );
    });

    it('support another id e.g. pokemon', async () => {
        const deck = await loadDeck('pokemon'); 

        expect(deck.suits).toHaveLength(4);
        expect(deck.values).toHaveLength(13);
    });

    it('rejects if no deck found with that id', async () => {  
        const deck = loadDeck('nonexistent');
        await expect(deck).rejects.toThrow(/not found/i);
    });
});