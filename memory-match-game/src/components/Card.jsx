import { motion } from 'framer-motion'

const Card = ({ card, onClick, isDisabled, isChecking }) => {
  const getCardBackground = () => {
    if (card.isMatched) {
      return 'bg-green-500'
    } else if (card.isFlipped) {
      return 'bg-blue-500'
    } else {
      return 'bg-gray-300'
    }
  }

  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: isDisabled || isChecking ? 1 : 1.05 }}
      onClick={() => !isDisabled && !isChecking && onClick(card)}
      style={{ perspective: 800 }}
    >
      <motion.div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg border flex items-center justify-center text-2xl ${getCardBackground()}`}
        animate={{
          rotateY: card.isFlipped || card.isMatched ? 180 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-white text-lg font-bold">?</span>
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <span className="text-2xl text-white">{card.symbol}</span>
        </div>
      </motion.div>

      {/* Small match indicator */}
      {card.isMatched && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}

      {/* Disabled overlay during checking */}
      {isChecking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black rounded-lg"
        />
      )}
    </motion.div>
  )
}

export default Card
