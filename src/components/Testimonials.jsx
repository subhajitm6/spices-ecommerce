import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Eleanor Vance",
    role: "Home Chef",
    quote: "The Kashmiri chili changed the way I cook. The color is incredibly vibrant without overpowering heat. Absolutely premium quality that you can taste in every bite.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Restaurant Owner",
    quote: "I've sourced spices from all over the world, and this collection stands out. The freshness is remarkable, and the aromas are profoundly authentic.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Culinary Enthusiast",
    quote: "The Garam Masala blend is a masterpiece. It brings such a warm, complex depth to my curries. It truly feels like a handcrafted luxury.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
  }
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="reviews" className="pt-[120px] pb-[120px] bg-background">
      <div className="premium-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Words From Our Kitchens
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover what culinary enthusiasts are saying.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 left-0 text-primary/10 -z-10 transform -translate-x-1/2 -translate-y-1/4">
            <Quote size={120} />
          </div>

          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="fill-primary text-primary mx-0.5" />
                  ))}
                </div>
                
                <p className="text-2xl md:text-3xl font-heading text-foreground leading-relaxed mb-10">
                  "{testimonials[current].quote}"
                </p>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-background shadow-lg mb-4">
                    <img 
                      src={testimonials[current].avatar} 
                      alt={testimonials[current].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-bold text-lg text-foreground">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-12 gap-4">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
