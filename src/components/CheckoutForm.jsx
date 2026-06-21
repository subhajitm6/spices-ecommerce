import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, User, MapPin, Building, Hash, TicketPercent, Truck, Zap, Package } from "lucide-react"

export default function CheckoutForm() {
  const [coupon, setCoupon] = useState("")
  const [isCouponApplied, setIsCouponApplied] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState("standard")

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (coupon.trim() !== "") {
      setIsCouponApplied(true)
    }
  }

  return (
    <div className="space-y-10">
      
      {/* Contact Information */}
      <section>
        <h3 className="text-xl font-heading font-bold text-foreground mb-6">1. Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground" />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground ml-1">Phone Number</label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="tel" placeholder="+91 98765 43210" className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground" />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Address */}
      <section>
        <h3 className="text-xl font-heading font-bold text-foreground mb-6">2. Delivery Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-foreground ml-1">Street Address</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="123 Spice Route, Flat 4B" className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">City</label>
            <div className="relative">
              <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Mumbai" className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">State</label>
            <input type="text" placeholder="Maharashtra" className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Pincode</label>
            <div className="relative">
              <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="400001" className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground ml-1">Country</label>
            <select className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground appearance-none">
              <option>India</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>
        </div>
      </section>

      {/* Delivery Method */}
      <section>
        <h3 className="text-xl font-heading font-bold text-foreground mb-6">3. Delivery Method</h3>
        <div className="space-y-4">
          
          <label className={`block relative p-4 border rounded-xl cursor-pointer transition-all ${deliveryMethod === "standard" ? "border-primary bg-primary/5" : "border-border hover:border-border/80"}`}>
            <input type="radio" name="delivery" value="standard" checked={deliveryMethod === "standard"} onChange={() => setDeliveryMethod("standard")} className="absolute opacity-0" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${deliveryMethod === "standard" ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"}`}>
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Standard Delivery</h4>
                  <p className="text-sm text-muted-foreground">3-5 business days</p>
                </div>
              </div>
              <span className="font-bold text-foreground">₹50.00</span>
            </div>
          </label>

          <label className={`block relative p-4 border rounded-xl cursor-pointer transition-all ${deliveryMethod === "express" ? "border-primary bg-primary/5" : "border-border hover:border-border/80"}`}>
            <input type="radio" name="delivery" value="express" checked={deliveryMethod === "express"} onChange={() => setDeliveryMethod("express")} className="absolute opacity-0" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${deliveryMethod === "express" ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"}`}>
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Express Delivery</h4>
                  <p className="text-sm text-muted-foreground">1-2 business days</p>
                </div>
              </div>
              <span className="font-bold text-foreground">₹120.00</span>
            </div>
          </label>

        </div>
      </section>

      {/* Coupon */}
      <section className="bg-surface/50 p-6 rounded-2xl border border-border">
        <div className="flex items-center gap-3 mb-4">
          <TicketPercent size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-bold text-foreground">Have a Promo Code?</h3>
        </div>
        <form onSubmit={handleApplyCoupon} className="flex gap-3">
          <input 
            type="text" 
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter code" 
            className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground uppercase" 
            disabled={isCouponApplied}
          />
          <button 
            type="submit" 
            disabled={isCouponApplied || !coupon.trim()}
            className="px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCouponApplied ? "Applied!" : "Apply"}
          </button>
        </form>
        {isCouponApplied && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-sm text-green-500 font-medium mt-3"
          >
            Promo code "{coupon.toUpperCase()}" applied successfully! 10% discount added.
          </motion.p>
        )}
      </section>

    </div>
  )
}
