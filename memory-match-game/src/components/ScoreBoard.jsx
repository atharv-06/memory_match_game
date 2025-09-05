const ScoreBoard = ({ moves, matches, score, bestScore, onRestart, onPause, isPaused, totalPairs }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="space-y-2">
          <p className="text-gray-700">Moves: <span className="font-bold">{moves}</span></p>
          <p className="text-gray-700">Matches: <span className="font-bold">{matches}/{totalPairs}</span></p>
          <p className="text-gray-700">Score: <span className="font-bold text-green-600">{score}</span></p>
          <p className="text-gray-700">Best Score: <span className="font-bold">{bestScore}</span></p>
        </div>

        <div className="space-x-4">
          <button
            onClick={onPause}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={onRestart}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScoreBoard