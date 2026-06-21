import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Lock } from "lucide-react"
import PaymentMethods from "../components/PaymentMethods"
import OrderSummary from "../components/OrderSummary"
import { useCart } from "../context/CartContext"

export default function Payment() {
  const navigate = useNavigate()
  const { cartItems } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  if (cartItems.length === 0) {
    setTimeout(() => navigate("/"), 0)
    return null
  }

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      navigate("/order-success")
    }, 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen pt-32 pb-20 bg-background"
    >
      <div className="premium-container max-w-7xl">
        <div className="mb-12 border-b border-border pb-8">
          <button 
            onClick={() => navigate("/checkout")}
            className="flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors w-fit mb-6"
            disabled={isProcessing}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Checkout
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
                Secure Payment
              </h1>
              <Lock size={28} className="text-primary" />
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <span className="text-primary">Information</span>
              <span className="text-primary opacity-50">/</span>
              <span className="text-primary">Payment</span>
              <span className="opacity-50">/</span>
              <span>Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 xl:col-span-8">
            <PaymentMethods />
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <OrderSummary 
              buttonText="Pay Securely" 
              onButtonClick={handlePayment} 
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
