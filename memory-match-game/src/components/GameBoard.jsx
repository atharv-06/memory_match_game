import { motion } from 'framer-motion'
import Card from './Card'
import { DIFFICULTY_LEVELS } from '../utils/constants'

const GameBoard = ({ cards, onCardClick, isPaused, isChecking, difficulty }) => {
  const gridClass = DIFFICULTY_LEVELS[difficulty].grid

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`grid ${gridClass} gap-4 p-4 max-w-4xl mx-auto`}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          isDisabled={isPaused}
          isChecking={isChecking}
        />
      ))}

      {/* Empty state message */}
      {cards.length === 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="col-span-full text-center py-8"
        >
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-xl font-semibold text-gray-700">
            All matches found! Great job!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default GameBoard