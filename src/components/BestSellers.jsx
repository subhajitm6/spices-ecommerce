import { motion } from "framer-motion"
import { ShoppingCart, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { products } from "../data/products"
import { useCart } from "../context/CartContext"

export default function BestSellers() {
  const { addToCart } = useCart()

  return (
    <section className="py-32 bg-surface/30">
      <div className="premium-container">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-[2.5rem] md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight">
            Customer Favorites
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our most loved spices that belong in every pantry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card rounded-[1.5rem] p-4 shadow-sm border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out group"
            >
              <Link to={`/product/${product.slug}`} className="block">
                <div className="relative aspect-square rounded-[1rem] overflow-hidden mb-6 bg-muted ring-1 ring-border/50">
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] font-bold text-primary tracking-wide uppercase shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  <button 
                    onClick={(e) => e.preventDefault()}
                    className="absolute top-3 right-3 z-10 p-2.5 bg-background/50 hover:bg-background backdrop-blur-md rounded-full text-muted-foreground hover:text-destructive transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 shadow-sm"
                  >
                    <Heart size={18} />
                  </button>
                  <img 
                    src={product.images ? product.images[0] : product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-110"
                  />
                </div>
              </Link>
              
              <div className="px-2 pb-2">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-5 line-clamp-2 min-h-[40px] leading-relaxed">
                  {product.shortDescription || product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-foreground tracking-tight">
                    ₹{product.price}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(product, 1, product.weight)
                    }}
                    className="flex items-center justify-center bg-primary text-primary-foreground p-3.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
                  >
                    <ShoppingCart size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
