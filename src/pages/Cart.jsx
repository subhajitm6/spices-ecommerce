import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"
import CartItem from "../components/CartItem"
import OrderSummary from "../components/OrderSummary"

export default function Cart() {
  const { cartItems } = useCart()
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-20 bg-background"
    >
      <div className="premium-container max-w-7xl">
        <div className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors w-fit mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
            Your Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center bg-surface/30 rounded-[2rem] border border-border"
          >
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 shadow-sm border border-border/50">
              <ShoppingBag size={40} className="text-muted-foreground opacity-50" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added any premium spices to your cart yet. Explore our collection to find your next favorite flavor.</p>
            <Link 
              to="/#collection"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary/20"
            >
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="bg-card rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border">
                <div className="flex justify-between items-center border-b border-border pb-6 mb-2 hidden sm:flex">
                  <span className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Product</span>
                  <span className="font-semibold text-muted-foreground text-sm uppercase tracking-wider text-right">Total</span>
                </div>
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <CartItem key={`${item.id}-${item.weight}`} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              <OrderSummary 
                buttonText="Proceed to Checkout" 
                onButtonClick={() => navigate("/checkout")} 
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
