import { motion } from "framer-motion"
import { ShoppingCart, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import { products } from "../data/products"

export default function RelatedProducts({ currentProduct }) {
  // Filter products by same category and exclude current product
  const related = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4)

  if (related.length === 0) return null

  return (
    <div className="mt-32 mb-20">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-heading font-bold text-foreground">You May Also Like</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {related.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/product/${product.slug}`} className="block">
              <div className="relative aspect-square rounded-[1.5rem] overflow-hidden mb-4 bg-muted ring-1 ring-border/50 group-hover:ring-primary/50 group-hover:shadow-xl transition-all duration-500">
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
                    {product.badge}
                  </div>
                )}
                <button 
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-3 right-3 z-10 p-2 bg-background/50 hover:bg-background backdrop-blur-md rounded-full text-muted-foreground hover:text-destructive transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
                >
                  <Heart size={16} />
                </button>
                <img 
                  src={product.images ? product.images[0] : product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>
            </Link>
            
            <div className="px-1">
              <Link to={`/product/${product.slug}`}>
                <h3 className="text-lg font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-semibold text-foreground">
                  ₹{product.price}
                </span>
                <button 
                  onClick={(e) => e.preventDefault()}
                  className="p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingCart size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
