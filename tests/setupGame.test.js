import { describe, it, expect, vi } from "vitest"
import { createCards } from "../src/createCards"
import { setupGame } from "../src/setupGame"

// import the modules to spy on
import * as shuffleModule from '../src/shuffle'
import * as dealModule from '../src/deal'

describe('setupGame', () => {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']

  it('calls shuffle before dealing cards', () => {
    const cards = createCards({ suits, values })
    const shuffleSpy = vi.spyOn(shuffleModule, 'shuffle')
    const dealSpy = vi.spyOn(dealModule, 'deal')

    setupGame(cards, 5, 3)

    expect(shuffleSpy).toHaveBeenCalledTimes(1)
    expect(shuffleSpy.mock.invocationCallOrder[0])
      .toBeLessThan(dealSpy.mock.invocationCallOrder[0])
  })

  it('calls deal with correct arguments', () => {
    const cards = createCards({ suits, values })
    const dealSpy = vi.spyOn(dealModule, 'deal')
    const shuffleSpy = vi.spyOn(shuffleModule, 'shuffle')
  
    setupGame(cards, 5, 3)
    
    // Get the shuffled cards that shuffle returned
    const shuffledCards = shuffleSpy.mock.results[0].value
    
    expect(dealSpy).toHaveBeenCalledWith(shuffledCards, 5, 3)

  })
})
