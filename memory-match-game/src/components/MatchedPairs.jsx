import { motion } from 'framer-motion'

const MatchedPairs = ({ matchedPairs, score, moves }) => {
  if (matchedPairs.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-4 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Matched Pairs 🏆
        </h3>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">Score: {score}</p>
          <p className="text-sm text-gray-600">Moves: {moves}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {matchedPairs.map((pair, index) => (
          <motion.div
            key={pair.matchId || index}
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            className="flex flex-col items-center p-3 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border-2 border-green-200 shadow-sm"
          >
            <div className="text-3xl mb-2 transform hover:scale-110 transition-transform">
              {pair.symbol}
            </div>
            <div className="text-xs font-medium text-green-700 bg-green-200 px-2 py-1 rounded-full">
              +{100 + Math.max(0, 100 - index * 5)} pts
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(matchedPairs.length / 6) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-600 text-center mt-1">
          {matchedPairs.length} of 6 pairs matched
        </p>
      </div>
    </motion.div>
  )
}

export default MatchedPairs