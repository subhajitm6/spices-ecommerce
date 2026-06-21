import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const { scrollY } = useScroll()
  
  const yText = useTransform(scrollY, [0, 1000], [0, 150])
  const yImage = useTransform(scrollY, [0, 1000], [0, -150])
  const yCards = useTransform(scrollY, [0, 1000], [0, -50])

  return (
    <section id="home" className="relative min-h-[100vh] flex items-center overflow-hidden pt-[120px] pb-[120px]">
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-background/80 to-background z-10"></div>
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen dark:mix-blend-lighten opacity-60"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-accent/15 rounded-full blur-[140px] mix-blend-screen dark:mix-blend-lighten opacity-60"></div>
      </div>

      <div className="premium-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[52fr_48fr] gap-16 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: yText }}
            className="w-full"
          >
            <motion.div variants={itemVariants} className="inline-block border border-border/60 bg-surface/50 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold text-primary mb-6 shadow-sm">
              Authentic D2C Spices
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-[3.5rem] md:text-[4.5rem] lg:text-[5rem] font-heading font-bold text-foreground leading-[0.95] tracking-tight mb-8 max-w-[720px]"
            >
              Bring Authentic <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Flavors
              </span> To Every Kitchen
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mt-6 mb-12 leading-[1.7] max-w-[620px] font-medium"
            >
              Freshly sourced premium spices delivered with unmatched purity. Handcrafted blends that elevate your daily meals into culinary masterpieces.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-5 mt-12">
              <Link to="/#collection" className="px-9 py-5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 ease-out active:scale-[0.98] inline-block">
                Shop Collection
              </Link>
              <Link to="/#story" className="px-9 py-5 bg-surface text-foreground font-semibold rounded-full border border-border/50 hover:bg-surface/80 hover:scale-[1.02] hover:shadow-md transition-all duration-300 ease-out active:scale-[0.98] inline-block">
                Explore Story
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Visuals */}
          <div className="relative h-[600px] hidden lg:block">
            {/* Main Floating Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ y: yImage }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full h-full max-w-[520px] mx-auto aspect-[4/5] rounded-[36px] overflow-hidden shadow-2xl ring-1 ring-border/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Premium Spice Bowl" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              style={{ y: yCards }}
              className="absolute top-16 right-4 w-32 h-32 bg-card p-2 rounded-[1.5rem] shadow-xl z-20 border border-border/30 hover:scale-105 transition-transform duration-300"
            >
              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-full h-full"
              >
                <img 
                  src="https://images.unsplash.com/photo-1614064506306-69121a8d05dd?q=80&w=1974&auto=format&fit=crop" 
                  alt="Cinnamon" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: yCards }}
              className="absolute bottom-16 -left-4 w-40 h-40 bg-card p-2 rounded-[1.5rem] shadow-xl z-20 border border-border/30 hover:scale-105 transition-transform duration-300"
            >
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="w-full h-full"
              >
                <img 
                  src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1968&auto=format&fit=crop" 
                  alt="Star Anise" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
