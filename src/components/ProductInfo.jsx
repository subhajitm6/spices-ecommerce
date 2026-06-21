import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Heart, Share2, Plus, Minus, Truck, ShieldCheck, CheckCircle2 } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedWeight, setSelectedWeight] = useState(product.weight || "100g")
  const { addToCart } = useCart()

  if (!product) return null

  const weightOptions = ["50g", "100g", "250g", "500g"]
  const priceMultiplier = { "50g": 0.6, "100g": 1, "250g": 2.2, "500g": 4 }
  
  const currentPrice = Math.round(product.price * priceMultiplier[selectedWeight])
  const currentOldPrice = product.oldPrice ? Math.round(product.oldPrice * priceMultiplier[selectedWeight]) : null

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">
            {product.category}
          </span>
          {product.badge && (
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
          {product.title}
        </h1>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"} 
              />
            ))}
          </div>
          <span className="text-sm font-bold text-foreground">{product.rating}</span>
          <span className="text-sm text-muted-foreground underline cursor-pointer">
            {product.reviewCount} Reviews
          </span>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Flavor Profile Visualization */}
      {product.flavorProfile && (
        <div className="mb-10 bg-surface/50 p-6 rounded-3xl border border-border/50">
          <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-widest">Flavor Profile</h3>
          <div className="space-y-4">
            {Object.entries(product.flavorProfile).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium text-muted-foreground capitalize">{key}</span>
                <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price & Selectors */}
      <div className="mb-8 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-widest">Select Weight</h3>
          <div className="flex flex-wrap gap-3">
            {weightOptions.map(weight => (
              <button
                key={weight}
                onClick={() => setSelectedWeight(weight)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                  selectedWeight === weight 
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20" 
                    : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {weight}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end gap-4">
          <span className="text-4xl font-heading font-bold text-foreground">
            ₹{currentPrice}
          </span>
          {currentOldPrice && (
            <span className="text-xl text-muted-foreground line-through mb-1">
              ₹{currentOldPrice}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="flex items-center justify-between bg-surface rounded-full border border-border p-1.5 w-full sm:w-32 shrink-0">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="p-3 hover:text-primary transition-colors hover:bg-background rounded-full"
          >
            <Minus size={18} />
          </button>
          <span className="font-bold w-6 text-center">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="p-3 hover:text-primary transition-colors hover:bg-background rounded-full"
          >
            <Plus size={18} />
          </button>
        </div>

        <button 
          onClick={() => addToCart({ ...product, price: currentPrice }, quantity, selectedWeight)}
          className="flex-1 bg-primary text-primary-foreground py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/20"
        >
          Add To Cart
        </button>

        <button className="p-4 rounded-full border border-border text-foreground hover:border-primary hover:text-primary hover:bg-surface transition-all">
          <Heart size={24} />
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-border mt-auto">
        <div className="flex items-center gap-3 text-muted-foreground">
          <CheckCircle2 size={20} className="text-primary" />
          <span className="text-sm font-medium">100% Authentic Quality</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <ShieldCheck size={20} className="text-primary" />
          <span className="text-sm font-medium">Secure Encrypted Checkout</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Truck size={20} className="text-primary" />
          <span className="text-sm font-medium">Fast & Reliable Delivery</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Share2 size={20} className="text-primary cursor-pointer hover:text-foreground transition-colors" />
          <span className="text-sm font-medium cursor-pointer hover:text-foreground transition-colors">Share Product</span>
        </div>
      </div>
    </div>
  )
}
