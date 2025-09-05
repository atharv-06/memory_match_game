import { useState, useEffect, useCallback } from 'react'
import { createCards, shuffleArray } from '../utils/gameLogic'
import { CARD_SYMBOLS, DIFFICULTY_LEVELS } from '../utils/constants'

export const useGameLogic = (difficulty = 'easy') => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [score, setScore] = useState(0)
  const [isChecking, setIsChecking] = useState(false) // Add checking state

  const initializeGame = useCallback(() => {
    const { pairs } = DIFFICULTY_LEVELS[difficulty]
    const newCards = createCards(pairs, CARD_SYMBOLS)
    setCards(newCards)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setMatchedPairs([])
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
    setIsChecking(false)
  }, [difficulty])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const handleCardClick = (clickedCard) => {
    if (isPaused || gameOver || clickedCard.isFlipped || clickedCard.isMatched || isChecking) return

    if (flippedCards.length < 2) {
      const newCards = cards.map(card =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
      setCards(newCards)

      const newFlippedCards = [...flippedCards, clickedCard]
      setFlippedCards(newFlippedCards)

      // Check for match when two cards are flipped
      if (newFlippedCards.length === 2) {
        setMoves(moves + 1)
        setIsChecking(true)
        setTimeout(() => checkForMatch(newFlippedCards), 500)
      }
    }
  }

  const checkForMatch = (currentFlipped) => {
    const [first, second] = currentFlipped

    if (first.symbol === second.symbol) {
      // Match found!
      const newMatchedPairs = [...matchedPairs, {
        symbol: first.symbol,
        cards: [first, second],
        matchId: Date.now() // Unique ID for each match
      }]
      setMatchedPairs(newMatchedPairs)

      // Calculate score (base 100 + bonus for fewer moves)
      const matchScore = 100 + Math.max(0, 100 - moves * 5)
      setScore(score + matchScore)

      // Mark cards as matched and remove from board
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === first.id || card.id === second.id
            ? { ...card, isMatched: true, isFlipped: false }
            : card
        )
      )

      setMatches(matches + 1)
      setFlippedCards([])
    } else {
      // No match - flip cards back after delay
      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            currentFlipped.some(fc => fc.id === card.id)
              ? { ...card, isFlipped: false }
              : card
          )
        )
        setFlippedCards([])
      }, 1000)
    }

    setIsChecking(false)
  }

  useEffect(() => {
    const totalPairs = DIFFICULTY_LEVELS[difficulty].pairs
    if (matches === totalPairs) {
      setGameOver(true)
    }
  }, [matches, difficulty])

  // Get only active (not matched) cards for the game board
  const activeCards = cards.filter(card => !card.isMatched)

  return {
    cards: activeCards,
    moves,
    matches,
    matchedPairs,
    score,
    gameOver,
    isPaused,
    isChecking,
    flippedCards,
    handleCardClick,
    initializeGame,
    setIsPaused
  }
}