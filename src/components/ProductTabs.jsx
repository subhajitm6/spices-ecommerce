import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description")

  const tabs = [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingredients" },
    { id: "nutrition", label: "Nutrition" },
    { id: "shipping", label: "Shipping" },
    { id: "faq", label: "FAQ" }
  ]

  const tabContent = {
    description: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          {product.description}
        </p>
        <p>
          Carefully cultivated by our partnered farmers, ensuring that only the finest produce makes it to your kitchen. The meticulous harvesting process and traditional sun-drying methods preserve the intense aromas and deep flavors.
        </p>
      </div>
    ),
    ingredients: (
      <div className="text-muted-foreground leading-relaxed">
        <p className="font-medium text-foreground mb-2">Contains:</p>
        <p>{product.ingredients}</p>
        <p className="mt-4 text-sm bg-surface p-4 rounded-xl border border-border">
          <strong>Allergen Info:</strong> Handled in a facility that also processes mustard and sesame seeds.
        </p>
      </div>
    ),
    nutrition: (
      <div className="text-muted-foreground leading-relaxed">
        <p>{product.nutrition}</p>
      </div>
    ),
    shipping: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p><strong>Standard Shipping:</strong> 3-5 business days.</p>
        <p><strong>Express Shipping:</strong> 1-2 business days.</p>
        <p>Free shipping on orders over ₹999. All spices are packed in airtight, smell-proof packaging to ensure maximum freshness upon arrival.</p>
      </div>
    ),
    faq: (
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <strong className="text-foreground block mb-1">How long does the spice stay fresh?</strong>
          <p>When stored in an airtight container in a cool, dark place, our spices maintain peak flavor for 12-18 months.</p>
        </div>
        <div>
          <strong className="text-foreground block mb-1">Is this product organic?</strong>
          <p>While not all our products are certified organic, we strictly source from farms that practice sustainable and natural farming without harsh pesticides.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-20 border-t border-border pt-16">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-border mb-8 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
