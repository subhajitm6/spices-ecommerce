import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function Story() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const yImage1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const yImage2 = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <section id="story" ref={containerRef} className="pt-[120px] pb-[120px] bg-surface overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="premium-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Image Collage */}
          <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px]">
            <motion.div
              style={{ y: yImage1 }}
              className="absolute top-0 right-0 w-[60%] h-[70%] rounded-[2rem] overflow-hidden shadow-2xl z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop" 
                alt="Spice Market" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              style={{ y: yImage2 }}
              className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-[2rem] overflow-hidden shadow-xl z-20 border-4 border-surface"
            >
              <img 
                src="https://images.unsplash.com/photo-1614064506306-69121a8d05dd?q=80&w=1974&auto=format&fit=crop" 
                alt="Handcrafted Spices" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Right: Story Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">Our Heritage</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-[1.2]">
              A legacy of flavor, <br />
              <span className="text-secondary">crafted with passion.</span>
            </h3>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                For over three generations, we have traversed the ancient spice routes, partnering with generational farmers who understand that true flavor cannot be rushed.
              </p>
              <p>
                Our commitment to sustainability means every harvest not only brings you the most potent flavors but also enriches the soil and supports the communities that nurture them.
              </p>
              <p>
                Experience the authentic taste of tradition in every pinch. We don't just sell spices; we deliver the essence of the earth, carefully preserved for your kitchen.
              </p>
            </div>

            <div className="mt-10 pt-10 border-t border-border/50 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-heading font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground font-medium">Partner Farms</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Sustainable</div>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground font-medium">Generations</div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
