import { motion } from "framer-motion"
import { Leaf, ShieldCheck, Truck, Sparkles } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Farm Fresh",
    description: "Sourced directly from partner farms within days of harvest for maximum potency."
  },
  {
    icon: Sparkles,
    title: "100% Natural",
    description: "No artificial colors, preservatives, or anti-caking agents. Just pure spice."
  },
  {
    icon: ShieldCheck,
    title: "Lab Tested",
    description: "Rigorous quality checks to ensure authentic flavor profiles and absolute purity."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Carefully packaged in premium air-tight containers and delivered swiftly."
  }
]

export default function Features() {
  return (
    <section className="pt-[120px] pb-[120px] bg-background border-y border-border/50">
      <div className="premium-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-[250px]">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
