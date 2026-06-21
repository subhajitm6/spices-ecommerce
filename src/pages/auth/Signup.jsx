import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import AuthLayout from "../../components/auth/AuthLayout"
import SocialLogin from "../../components/auth/SocialLogin"
import { useAuth } from "../../context/AuthContext"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })
  
  const { signup, loading } = useAuth()
  const navigate = useNavigate()

  // Calculate simple password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { label: "", color: "bg-border", width: "0%" }
    if (pass.length < 6) return { label: "Weak", color: "bg-red-500", width: "33%" }
    if (pass.length < 10) return { label: "Medium", color: "bg-yellow-500", width: "66%" }
    return { label: "Strong", color: "bg-green-500", width: "100%" }
  }

  const strength = getPasswordStrength(formData.password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    await signup(formData)
    navigate("/profile")
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join Aura Spices to experience premium flavors."
      bgImage="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground ml-1">First Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground ml-1">Last Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground ml-1">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground ml-1">Phone</label>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="tel" name="phone" value={formData.phone} onChange={handleChange} required
              className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground ml-1">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required
              className="w-full pl-11 pr-11 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
            />
            <button 
              type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {formData.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.width }}></div>
              </div>
              <span className="text-[10px] uppercase font-bold text-muted-foreground w-12">{strength.label}</span>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground ml-1">Confirm Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required
              className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" 
            />
          </div>
        </div>

        <label className="flex items-start gap-2 cursor-pointer mt-4">
          <input type="checkbox" required className="mt-1 w-4 h-4 accent-primary rounded border-border" />
          <span className="text-xs text-muted-foreground leading-relaxed">
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </span>
        </label>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-transform hover:-translate-y-1 shadow-lg shadow-primary/20 mt-2 disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>

      <div className="mt-6 mb-6">
        <SocialLogin />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/auth/login" className="font-semibold text-primary hover:underline">Log in</Link>
      </p>

    </AuthLayout>
  )
}
