import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Heart, MapPin, Settings, LogOut, ChevronRight } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Profile() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("orders")

  const tabs = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Mock data
  const mockOrders = [
    { id: "ORD-847291", date: "Oct 24, 2026", total: "₹1,240", status: "Delivered", items: 3 },
    { id: "ORD-938104", date: "Sep 12, 2026", total: "₹850", status: "Processing", items: 1 },
  ]

  const mockAddresses = [
    { id: 1, type: "Home", address: "123 Spice Route, Flat 4B", city: "Mumbai", state: "Maharashtra", pin: "400001", default: true },
    { id: 2, type: "Office", address: "Tech Park, Building 9", city: "Bangalore", state: "Karnataka", pin: "560001", default: false },
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Profile Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface/50 border border-border rounded-[2rem] p-8 md:p-12 mb-10 flex flex-col md:flex-row items-center gap-8 shadow-sm"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl shrink-0">
            <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              {user?.name || "Premium Member"}
            </h1>
            <p className="text-muted-foreground text-lg mb-4">{user?.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wider uppercase">
                Gold Tier
              </span>
              <span className="px-4 py-1.5 bg-surface border border-border rounded-full text-sm font-bold tracking-wider uppercase text-muted-foreground">
                Joined 2026
              </span>
            </div>
          </div>
          <div>
            <button 
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 border border-border bg-background hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 rounded-xl transition-all font-semibold shadow-sm text-muted-foreground"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </motion.div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 lg:col-span-3"
          >
            <div className="bg-surface/50 border border-border rounded-2xl overflow-hidden sticky top-32">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-5 transition-all border-b border-border last:border-b-0 ${
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-semibold">{tab.label}</span>
                    </div>
                    <ChevronRight size={18} className={isActive ? "opacity-100" : "opacity-0"} />
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-8 lg:col-span-9"
          >
            <AnimatePresence mode="wait">
              
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Recent Orders</h2>
                  {mockOrders.map((order) => (
                    <div key={order.id} className="bg-surface/30 border border-border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-primary/50 transition-colors cursor-pointer group">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-foreground">{order.id}</h3>
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                            order.status === "Delivered" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.date} • {order.items} Items</p>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                        <span className="text-xl font-bold text-foreground">{order.total}</span>
                        <span className="text-sm font-semibold text-primary group-hover:underline">View Details</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-heading font-bold text-foreground">Saved Addresses</h2>
                    <button className="text-sm font-bold text-primary hover:underline">Add New</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockAddresses.map((addr) => (
                      <div key={addr.id} className="bg-surface/30 border border-border rounded-2xl p-6 relative group">
                        {addr.default && (
                          <span className="absolute top-6 right-6 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">Default</span>
                        )}
                        <h3 className="font-bold text-lg text-foreground mb-3">{addr.type}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-[200px]">
                          {addr.address}<br />
                          {addr.city}, {addr.state} {addr.pin}
                        </p>
                        <div className="flex gap-4">
                          <button className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Edit</button>
                          <button className="text-sm font-semibold text-muted-foreground hover:text-red-500 transition-colors">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "wishlist" && (
                <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="py-12 text-center">
                  <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground">Save items you love to view them later.</p>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Account Settings</h2>
                  <div className="space-y-4 max-w-xl">
                    <div className="flex items-center justify-between p-4 bg-surface/30 border border-border rounded-xl">
                      <div>
                        <h4 className="font-bold text-foreground">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive updates on orders and promotions</p>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-primary w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface/30 border border-border rounded-xl">
                      <div>
                        <h4 className="font-bold text-foreground">Dark Mode</h4>
                        <p className="text-sm text-muted-foreground">Toggle the luxury dark theme</p>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-primary w-5 h-5" />
                    </div>
                    <button className="mt-8 px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all">
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
