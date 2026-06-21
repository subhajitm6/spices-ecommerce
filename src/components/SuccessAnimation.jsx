import { motion } from "framer-motion"

export default function SuccessAnimation() {
  return (
    <div className="relative flex justify-center items-center w-40 h-40 mx-auto mb-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
        className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring", bounce: 0.5 }}
        className="relative z-10 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40"
      >
        <motion.svg
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="w-12 h-12 text-primary-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.div>

      {/* Confetti particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 1, 0], 
            x: (Math.random() - 0.5) * 200, 
            y: (Math.random() - 0.5) * 200,
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-accent'}`}
          style={{ originX: 0.5, originY: 0.5 }}
        />
      ))}
    </div>
  )
}
