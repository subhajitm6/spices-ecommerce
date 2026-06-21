import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-muted ring-1 ring-border shadow-md group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            alt={`Product image ${currentIndex + 1}`}
          />
        </AnimatePresence>
        
        {/* Floating particles effect container */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/40 blur-[1px] animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-accent/30 blur-[2px] animate-bounce"></div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden transition-all duration-300 ${
              currentIndex === idx 
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background opacity-100 scale-100" 
                : "opacity-60 hover:opacity-100 hover:scale-105 ring-1 ring-border"
            }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
