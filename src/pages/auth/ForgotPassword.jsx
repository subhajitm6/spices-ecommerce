import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, ArrowLeft } from "lucide-react"
import AuthLayout from "../../components/auth/AuthLayout"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false)
      // Save email to localStorage or pass via state to verification page
      sessionStorage.setItem("reset_email", email)
      navigate("/auth/verify-otp")
    }, 1500)
  }

  return (
    <AuthLayout 
      title="Forgot Password" 
      subtitle="Enter your email address and we'll send you a 6-digit OTP to reset your password."
      bgImage="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        
        <div className="space-y-2">
          <label className="text-sm font-bold tracking-wider uppercase text-muted-foreground ml-1">Email Address</label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com" 
              required
              className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || !email}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? "Sending OTP..." : "Send Reset Link"}
        </button>

      </form>

      <div className="mt-8 text-center">
        <Link to="/auth/login" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Login
        </Link>
      </div>

    </AuthLayout>
  )
}
