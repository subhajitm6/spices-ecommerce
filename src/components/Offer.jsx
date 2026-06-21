import { motion } from "framer-motion"

export default function Offer() {
  return (
    <section className="pt-[120px] pb-[120px] bg-background">
      <div className="premium-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] overflow-hidden bg-[#18120D] text-[#FFF7EE]"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop" 
              alt="Spices" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#18120D] via-[#18120D]/90 to-transparent"></div>
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 max-w-2xl">
            <div className="inline-block bg-primary text-white text-sm font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6">
              Limited Time Offer
            </div>
            
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white leading-tight">
              The Essential<br />
              <span className="text-primary">Winter Collection</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Elevate your winter recipes with our specially curated box of warming spices. Includes premium cinnamon, star anise, cloves, and our signature chai masala.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex flex-col">
                <span className="text-sm text-white/60 uppercase tracking-widest mb-1">Ends In</span>
                <div className="flex gap-4 font-heading text-3xl font-bold text-white">
                  <div>03<span className="text-sm font-body text-white/60 ml-1">d</span></div>
                  <div>12<span className="text-sm font-body text-white/60 ml-1">h</span></div>
                  <div>45<span className="text-sm font-body text-white/60 ml-1">m</span></div>
                </div>
              </div>
            </div>

            <button className="bg-primary text-white px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
              Claim 20% Off Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
