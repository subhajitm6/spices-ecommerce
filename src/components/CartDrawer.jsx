import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart()
  const navigate = useNavigate()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-heading font-bold text-foreground">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-surface rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <ShoppingBag size={64} className="mb-6 opacity-20" />
                  <p className="text-xl font-heading font-medium">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 text-primary hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.weight}`} className="flex gap-4 bg-surface/50 p-4 rounded-2xl border border-border/50">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                        <img src={item.images ? item.images[0] : item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-foreground line-clamp-1">{item.title}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id, item.weight)}
                              className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.weight}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-background rounded-full border border-border">
                            <button 
                              onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                              className="p-1.5 hover:text-primary transition-colors disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                              className="p-1.5 hover:text-primary transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-foreground">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border bg-surface/30">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-medium text-foreground">Subtotal</span>
                  <span className="text-2xl font-bold text-foreground">₹{cartTotal}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      setIsCartOpen(false)
                      navigate("/cart")
                    }}
                    className="w-full py-4 rounded-xl font-bold border border-border text-foreground hover:bg-surface transition-colors"
                  >
                    View Cart
                  </button>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false)
                      navigate("/checkout")
                    }}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary/20"
                  >
                    Checkout Now
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
