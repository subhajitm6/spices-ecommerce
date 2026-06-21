import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    title: "Whole Spices",
    description: "Pristine, unground spices retaining their essential oils and maximum flavor.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Ground Spices",
    description: "Finely milled pure single spices for everyday authentic cooking.",
    image: "https://images.unsplash.com/photo-1628117361958-3f5f3e5b6db7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Blended Masalas",
    description: "Handcrafted authentic blends passed down through generations.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Premium Collections",
    description: "Curated gift boxes and rare spices for the ultimate culinary experience.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Categories() {
  return (
    <section id="collection" className="py-32 bg-background">
      <div className="premium-container">
        <div className="flex justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-[2.5rem] md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight">
              Explore Our Collections
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover our carefully curated range of premium spices, sourced directly from the finest farms.
            </p>
          </div>
          <button className="hidden md:flex items-center text-primary font-semibold hover:text-primary/80 transition-all hover:translate-x-1 group">
            View All Categories 
            <ArrowRight size={20} className="ml-2 transition-transform" />
          </button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group cursor-pointer flex flex-col h-full hover:-translate-y-2 transition-transform duration-500 ease-out"
            >
              <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-2xl ring-1 ring-border/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:opacity-70 transition-opacity duration-500 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-grow text-sm md:text-base">
                {category.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <button className="mt-12 w-full md:hidden flex justify-center items-center text-primary font-medium hover:text-primary/80 transition-colors group py-4 border border-border rounded-full">
          View All Categories 
          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  )
}
