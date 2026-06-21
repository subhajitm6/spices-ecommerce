import { useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Package, MapPin, Calendar } from "lucide-react"
import SuccessAnimation from "../components/SuccessAnimation"
import { useCart } from "../context/CartContext"

export default function OrderSuccess() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear cart on successful order
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 3)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center"
    >
      <div className="premium-container max-w-3xl">
        <div className="bg-surface/30 border border-border rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl">
          
          <SuccessAnimation />

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 tracking-tight"
          >
            Payment Successful!
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto"
          >
            Thank you for your order. We are preparing your premium spices and will send you a shipping confirmation email shortly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left"
          >
            <div className="bg-background border border-border p-5 rounded-2xl">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <Package size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Order Number</span>
              </div>
              <p className="font-mono text-lg font-bold text-foreground">{orderNumber}</p>
            </div>
            
            <div className="bg-background border border-border p-5 rounded-2xl">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <Calendar size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Est. Delivery</span>
              </div>
              <p className="font-semibold text-foreground">{deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
            </div>

            <div className="bg-background border border-border p-5 rounded-2xl">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <MapPin size={18} />
                <span className="text-sm font-bold uppercase tracking-wider">Shipping To</span>
              </div>
              <p className="font-semibold text-foreground line-clamp-1">John Doe, 123 Spice Route...</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link 
              to="/"
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="#"
              className="w-full sm:w-auto bg-surface text-foreground border border-border px-8 py-4 rounded-full font-bold hover:bg-surface/80 transition-all hover:-translate-y-1 active:translate-y-0"
            >
              Track Order
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
