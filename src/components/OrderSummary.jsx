import { useCart } from "../context/CartContext"
import { motion } from "framer-motion"
import { ShieldCheck, ArrowRight } from "lucide-react"

export default function OrderSummary({ buttonText, onButtonClick, isProcessing = false }) {
  const { cartItems, cartTotal } = useCart()

  const shipping = cartTotal > 999 ? 0 : 50
  const tax = cartTotal * 0.05 // 5% tax
  const finalTotal = cartTotal + shipping + tax

  if (cartItems.length === 0) return null

  return (
    <div className="bg-surface/50 border border-border rounded-3xl p-6 lg:p-8 sticky top-32">
      <h3 className="text-2xl font-heading font-bold text-foreground mb-6">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal ({cartItems.length} items)</span>
          <span className="font-semibold text-foreground">₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-semibold text-foreground">
            {shipping === 0 ? <span className="text-primary uppercase text-xs font-bold tracking-wider">Free</span> : `₹${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Taxes (5%)</span>
          <span className="font-semibold text-foreground">₹{tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t border-border/50 pt-6 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-lg font-semibold text-foreground">Total</span>
          <span className="text-3xl font-heading font-bold text-foreground">₹{finalTotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-right">Includes all taxes and duties</p>
      </div>

      <button
        onClick={onButtonClick}
        disabled={isProcessing}
        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-all hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] flex items-center justify-center shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isProcessing ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <>
            {buttonText}
            <ArrowRight size={20} className="ml-2" />
          </>
        )}
      </button>

      <div className="mt-8 space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <ShieldCheck size={18} className="text-primary mr-3" />
          Secure 256-bit SSL encryption.
        </div>
      </div>
    </div>
  )
}
