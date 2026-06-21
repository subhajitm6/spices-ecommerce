import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreditCard, Smartphone, Building2, Wallet, Banknote } from "lucide-react"
import CardPreview from "./CardPreview"

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState("card")
  
  // Card Form State
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  const methods = [
    { id: "card", label: "Credit/Debit Card", icon: CreditCard },
    { id: "upi", label: "UPI Apps", icon: Smartphone },
    { id: "netbanking", label: "Net Banking", icon: Building2 },
    { id: "wallet", label: "Wallets", icon: Wallet },
    { id: "cod", label: "Cash on Delivery", icon: Banknote },
  ]

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16)
    setCardNumber(value)
  }

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
    setCardExpiry(value)
  }

  return (
    <div className="space-y-10">
      
      {/* Method Selection */}
      <section>
        <h3 className="text-xl font-heading font-bold text-foreground mb-6">Payment Method</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {methods.map((method) => {
            const Icon = method.icon
            const isSelected = selectedMethod === method.id
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                  isSelected 
                    ? "border-primary bg-primary/5 text-primary shadow-sm" 
                    : "border-border bg-surface text-muted-foreground hover:border-border/80 hover:bg-surface/80"
                }`}
              >
                <Icon size={24} className="mb-3" />
                <span className="text-xs font-semibold text-center leading-tight">{method.label}</span>
                {isSelected && (
                  <motion.div 
                    layoutId="selectedPayment"
                    className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                  />
                )}
              </button>
            )
          })}
        </div>
      </section>

      {/* Dynamic Form Area */}
      <section className="bg-surface/30 p-6 md:p-8 rounded-[2rem] border border-border min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {selectedMethod === "card" && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >
              {/* Card Form */}
              <div className="space-y-6 order-2 md:order-1">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Card Holder</label>
                  <input 
                    type="text" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="JOHN DOE" 
                    className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground uppercase" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Card Number</label>
                  <input 
                    type="text" 
                    value={cardNumber}
                    onChange={handleNumberChange}
                    placeholder="0000 0000 0000 0000" 
                    className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground font-mono" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Expiry (MM/YY)</label>
                    <input 
                      type="text" 
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY" 
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">CVV</label>
                    <input 
                      type="password" 
                      maxLength="4"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                      placeholder="•••" 
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground font-mono" 
                    />
                  </div>
                </div>
              </div>

              {/* Card Preview */}
              <div className="order-1 md:order-2 flex justify-center perspective-1000">
                <CardPreview name={cardName} number={cardNumber} expiry={cardExpiry} />
              </div>
            </motion.div>
          )}

          {selectedMethod === "upi" && (
            <motion.div
              key="upi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <Smartphone size={48} className="text-muted-foreground mb-6 opacity-50" />
              <h4 className="text-lg font-bold text-foreground mb-2">Pay via UPI</h4>
              <p className="text-sm text-muted-foreground mb-8 max-w-sm">Enter your UPI ID or scan the QR code to proceed with a secure payment.</p>
              <div className="w-full max-w-sm space-y-4">
                <input 
                  type="text" 
                  placeholder="username@upi" 
                  className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground text-center" 
                />
                <button className="w-full py-3.5 bg-foreground text-background font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all">
                  Verify & Pay
                </button>
              </div>
            </motion.div>
          )}

          {selectedMethod === "netbanking" && (
            <motion.div
              key="netbanking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-10"
            >
              <h4 className="text-lg font-bold text-foreground mb-6 text-center">Select Your Bank</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {["HDFC", "SBI", "ICICI", "Axis"].map((bank) => (
                  <button key={bank} className="p-4 border border-border rounded-xl bg-background hover:border-primary transition-all font-semibold text-sm">
                    {bank}
                  </button>
                ))}
              </div>
              <div className="mt-6 max-w-2xl mx-auto">
                <select className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground appearance-none">
                  <option>Select other bank...</option>
                  <option>Kotak Mahindra</option>
                  <option>Punjab National Bank</option>
                  <option>Bank of Baroda</option>
                </select>
              </div>
            </motion.div>
          )}

          {selectedMethod === "wallet" && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-10"
            >
              <h4 className="text-lg font-bold text-foreground mb-6 text-center">Select Wallet</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                {["Paytm Wallet", "Amazon Pay", "Mobikwik", "Freecharge"].map((wallet) => (
                  <label key={wallet} className="flex items-center gap-3 p-4 border border-border rounded-xl bg-background cursor-pointer hover:border-primary transition-all">
                    <input type="radio" name="wallet" className="accent-primary w-4 h-4" />
                    <span className="font-semibold text-sm">{wallet}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {selectedMethod === "cod" && (
            <motion.div
              key="cod"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <Banknote size={48} className="text-muted-foreground mb-6 opacity-50" />
              <h4 className="text-lg font-bold text-foreground mb-2">Cash on Delivery</h4>
              <p className="text-sm text-muted-foreground max-w-sm">
                Pay in cash when your order is delivered to your doorstep. Please keep exact change ready.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

    </div>
  )
}
