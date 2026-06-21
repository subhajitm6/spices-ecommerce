import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ChevronRight, ArrowLeft } from "lucide-react"
import { products } from "../data/products"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"
import ProductTabs from "../components/ProductTabs"
import Reviews from "../components/Reviews"
import RelatedProducts from "../components/RelatedProducts"

export default function ProductDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  const product = products.find(p => p.slug === slug)

  useEffect(() => {
    if (!product) {
      // Could redirect to 404, but for now just go home
      navigate("/")
    }
  }, [product, navigate])

  if (!product) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pt-28 pb-20 bg-background"
    >
      <div className="premium-container">
        
        {/* Breadcrumb & Back */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors w-fit"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </button>
          
          <nav className="flex items-center text-sm text-muted-foreground font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2 opacity-50" />
            <Link to="/#collection" className="hover:text-primary transition-colors">Collection</Link>
            <ChevronRight size={14} className="mx-2 opacity-50" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>

        {/* Top Section: Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-32 self-start">
            <ProductGallery images={product.images} />
          </div>
          <div className="py-2">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Bottom Section: Tabs, Related, Reviews */}
        <ProductTabs product={product} />
        <RelatedProducts currentProduct={product} />
        <Reviews rating={product.rating} reviewCount={product.reviewCount} />
        
      </div>
    </motion.div>
  )
}
