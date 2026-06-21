import { motion } from "framer-motion"

export default function CardPreview({ name, number, expiry }) {
  // Format the number to show spaces every 4 digits
  const formattedNumber = number.padEnd(16, "•").match(/.{1,4}/g)?.join(" ") || "•••• •••• •••• ••••"
  const formattedExpiry = expiry.padEnd(4, "•").replace(/(.{2})/, "$1/").slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-[380px] mx-auto aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between text-white"
      style={{
        background: "linear-gradient(135deg, #2D2520 0%, #1A1512 100%)",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
      }}
    >
      {/* Glossy Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl" />
      
      {/* Decorative Circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start">
        <svg viewBox="0 0 48 48" className="w-10 h-10 opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44 18V36C44 38.2091 42.2091 40 40 40H8C5.79086 40 4 38.2091 4 36V18M44 18V12C44 9.79086 42.2091 8 40 8H8C5.79086 8 4 9.79086 4 12V18M44 18H4M14 28H18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="flex -space-x-3">
          <div className="w-8 h-8 rounded-full bg-white/40 backdrop-blur-sm mix-blend-screen" />
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm mix-blend-screen" />
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="font-mono text-2xl tracking-[0.15em] font-medium opacity-90">
          {formattedNumber}
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Card Holder</div>
            <div className="font-medium tracking-widest uppercase truncate max-w-[200px]">
              {name || "YOUR NAME"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Expires</div>
            <div className="font-mono tracking-widest">{formattedExpiry === "••/••" ? "MM/YY" : formattedExpiry}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
