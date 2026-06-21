import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react"
import AuthLayout from "../../components/auth/AuthLayout"

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    { regex: /[0-9]/, text: "At least 1 number" },
    { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check all requirements
    const isValid = requirements.every(req => req.regex.test(password))
    if (!isValid) return
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // Clears session storage
      sessionStorage.removeItem("reset_email")
      alert("Password reset successful! Please login.")
      navigate("/auth/login")
    }, 1500)
  }

  return (
    <AuthLayout 
      title="Create new password" 
      subtitle="Your new password must be different from previous used passwords."
      bgImage="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
    >
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        
        <div className="space-y-2">
          <label className="text-sm font-bold tracking-wider uppercase text-muted-foreground ml-1">New Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="w-full pl-12 pr-12 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold tracking-wider uppercase text-muted-foreground ml-1">Confirm Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground" 
            />
          </div>
        </div>

        <div className="bg-surface/50 rounded-xl p-4 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-3">Password requirements:</p>
          <ul className="space-y-2">
            {requirements.map((req, index) => {
              const isMet = req.regex.test(password)
              return (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className={isMet ? "text-green-500" : "text-muted-foreground/30"} />
                  <span className={isMet ? "text-foreground" : "text-muted-foreground"}>{req.text}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <button 
          type="submit" 
          disabled={loading || !requirements.every(req => req.regex.test(password)) || password !== confirmPassword}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

      </form>
    </AuthLayout>
  )
}
