import { motion } from "framer-motion"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Categories from "../components/Categories"
import BestSellers from "../components/BestSellers"
import Story from "../components/Story"
import Testimonials from "../components/Testimonials"
import Offer from "../components/Offer"
import Newsletter from "../components/Newsletter"

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Hero />
      <Features />
      <Categories />
      <BestSellers />
      <Story />
      <Testimonials />
      <Offer />
      <Newsletter />
    </motion.div>
  )
}
