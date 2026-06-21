import { motion } from "framer-motion"
import { Send } from "lucide-react"

export default function Newsletter() {
  return (
    <section className="pt-[120px] pb-[120px] bg-surface/50 border-t border-border/50">
      <div className="premium-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Join Our Culinary Journey
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Subscribe to receive exclusive offers, new harvest alerts, and secret family recipes straight to your inbox.
          </p>
          
          <form className="relative max-w-md mx-auto group">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-background border border-border rounded-full px-6 py-4 pr-16 outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground shadow-sm"
              required
            />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <Send size={18} className="ml-0.5" />
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            We respect your privacy. No spam, ever.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
