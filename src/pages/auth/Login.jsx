import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import AuthLayout from "../../components/auth/AuthLayout"
import SocialLogin from "../../components/auth/SocialLogin"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await login(email, password)
      navigate("/profile")
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your details to access your account."
      bgImage="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold tracking-wider uppercase text-muted-foreground ml-1">Email</label>
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

        <div className="space-y-2">
          <label className="text-sm font-bold tracking-wider uppercase text-muted-foreground ml-1">Password</label>
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 accent-primary rounded border-border cursor-pointer" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
          </label>
          <Link to="/auth/forgot-password" className="text-sm font-semibold text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 flex justify-center items-center h-[56px]"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            "Login to Account"
          )}
        </button>

      </form>

      <div className="mt-8 mb-8">
        <SocialLogin />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        New here? <Link to="/auth/signup" className="font-semibold text-primary hover:underline">Create an account</Link>
      </p>

    </AuthLayout>
  )
}
