import { useState } from 'react'
import { useGameLogic } from './hooks/useGameLogic'
import { useLocalStorage } from './hooks/useLocalStorage'
import GameBoard from './components/GameBoard'
import ScoreBoard from './components/ScoreBoard'
import GameOverModal from './components/GameOverModal'
import MatchedPairs from './components/MatchedPairs'
import { DIFFICULTY_LEVELS } from './utils/constants'

function App() {
  const [difficulty, setDifficulty] = useState('easy')
  const [bestScore, setBestScore] = useLocalStorage('memoryMatchBestScore', 0)
  const [showGameOver, setShowGameOver] = useState(false)

  const {
    cards,
    moves,
    matches,
    matchedPairs,
    score,
    gameOver,
    isPaused,
    isChecking,
    handleCardClick,
    initializeGame,
    setIsPaused
  } = useGameLogic(difficulty)

  const totalPairs = DIFFICULTY_LEVELS[difficulty].pairs

  const handleRestart = () => {
    initializeGame()
    setShowGameOver(false)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const updateBestScore = () => {
    if (score > bestScore) {
      setBestScore(score)
    }
  }

  if (gameOver && !showGameOver) {
    updateBestScore()
    setShowGameOver(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Memory Match 🎮
        </h1>

        {/* Difficulty Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty:
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(DIFFICULTY_LEVELS).map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ScoreBoard
          moves={moves}
          matches={matches}
          score={score}
          bestScore={bestScore}
          totalPairs={totalPairs}
          onRestart={handleRestart}
          onPause={handlePause}
          isPaused={isPaused}
        />

        {/* Show matched pairs */}
        <MatchedPairs
          matchedPairs={matchedPairs}
          score={score}
          moves={moves}
        />

        <GameBoard
          cards={cards}
          onCardClick={handleCardClick}
          isPaused={isPaused}
          isChecking={isChecking}
          difficulty={difficulty}
        />

        {showGameOver && (
          <GameOverModal
            moves={moves}
            score={score}
            bestScore={bestScore}
            onRestart={handleRestart}
            onClose={() => setShowGameOver(false)}
          />
        )}
      </div>
    </div>
  )
}

export default App