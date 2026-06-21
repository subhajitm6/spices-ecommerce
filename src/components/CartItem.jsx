import { motion } from "framer-motion"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-6 border-b border-border/50 group"
    >
      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0 relative">
        <img 
          src={item.images ? item.images[0] : item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-heading font-bold text-foreground mb-1 line-clamp-1">{item.title}</h4>
        <div className="text-sm text-muted-foreground mb-3 flex items-center gap-3">
          <span className="bg-surface px-2.5 py-1 rounded-md border border-border">{item.weight}</span>
          <span className="font-semibold text-foreground">₹{item.price}</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center border border-border rounded-full bg-surface">
            <button 
              onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={() => removeFromCart(item.id, item.weight)}
            className="text-muted-foreground hover:text-destructive flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
      
      <div className="text-right ml-auto hidden sm:block">
        <p className="text-xl font-heading font-bold text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </motion.div>
  )
}
