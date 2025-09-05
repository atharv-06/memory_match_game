import { motion } from 'framer-motion'

const GameOverModal = ({ moves, score, bestScore, onRestart, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-8 max-w-md mx-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Game Over! 🎉</h2>
        <p className="text-center text-gray-700 mb-2">You completed the game in {moves} moves!</p>
        <p className="text-center text-2xl font-bold text-green-600 mb-2">Final Score: {score}</p>
        <p className="text-center text-gray-700 mb-6">Best Score: {bestScore}</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onRestart}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GameOverModal