import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function AuthLayout({ children, title, subtitle, bgImage }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      
      {/* Decorative background glows for mobile/desktop */}
      <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-accent/15 rounded-full blur-[120px] mix-blend-screen opacity-60 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-8 md:p-12 relative z-10 flex justify-center mt-16 md:mt-0">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1000px] bg-card/60 backdrop-blur-xl border border-border/50 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Panel - Visual (Hidden on mobile) */}
          <div className="hidden md:block md:w-1/2 relative overflow-hidden bg-muted">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <img 
              src={bgImage || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"} 
              alt="Premium Spices" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-12 left-12 right-12 z-20">
              <Link to="/" className="text-3xl font-heading font-bold tracking-tight text-white mb-4 block">
                Aura Spices.
              </Link>
              <p className="text-white/80 font-medium leading-relaxed">
                Experience the world's finest, ethically sourced spices. Elevate your culinary journey today.
              </p>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center relative">
            <div className="md:hidden flex justify-center mb-8">
              <Link to="/" className="text-2xl font-heading font-bold tracking-tight text-primary">
                Aura Spices.
              </Link>
            </div>

            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-3">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>

            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
