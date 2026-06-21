import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import AuthLayout from "../../components/auth/AuthLayout"
import OTPInput from "../../components/auth/OTPInput"

export default function VerifyOTP() {
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const email = sessionStorage.getItem("reset_email") || "your email"

  useEffect(() => {
    const timer = countdown > 0 && setInterval(() => setCountdown(c => c - 1), 1000)
    return () => clearInterval(timer)
  }, [countdown])

  const handleVerify = (e) => {
    e?.preventDefault()
    if (otp.length !== 6) return
    
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate("/auth/reset-password")
    }, 1500)
  }

  const handleResend = () => {
    setCountdown(30)
    // Simulate resend
  }

  return (
    <AuthLayout 
      title="Check your email" 
      subtitle={`We've sent a 6-digit verification code to ${email}.`}
      bgImage="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
    >
      <form onSubmit={handleVerify} className="space-y-8 mt-6">
        
        <div className="flex justify-center">
          <OTPInput length={6} onComplete={(val) => {
            setOtp(val)
            // Auto-verify if desired, but user might want to check it
          }} />
        </div>

        <button 
          type="submit" 
          disabled={loading || otp.length !== 6}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>

      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          {countdown > 0 ? (
            <span className="font-medium text-foreground">Resend in {countdown}s</span>
          ) : (
            <button onClick={handleResend} className="font-semibold text-primary hover:underline">
              Resend Code
            </button>
          )}
        </p>

        <Link to="/auth/forgot-password" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mt-4">
          <ArrowLeft size={16} className="mr-2" />
          Back to Email
        </Link>
      </div>

    </AuthLayout>
  )
}
