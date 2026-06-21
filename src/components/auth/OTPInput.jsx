import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function OTPInput({ length = 6, onComplete }) {
  const [otp, setOtp] = useState(new Array(length).fill(""))
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value
    if (isNaN(value)) return

    const newOtp = [...otp]
    
    // Allow pasting
    if (value.length > 1) {
      const pastedData = value.slice(0, length).split("")
      for (let i = 0; i < length; i++) {
        newOtp[i] = pastedData[i] || ""
      }
      setOtp(newOtp)
      
      // Focus last filled input or the first empty one
      const focusIndex = pastedData.length < length ? pastedData.length : length - 1
      inputRefs.current[focusIndex].focus()
      
      if (pastedData.length === length) {
        onComplete(newOtp.join(""))
      }
      return
    }

    // Normal typing
    newOtp[index] = value
    setOtp(newOtp)

    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }

    if (newOtp.every(v => v !== "")) {
      onComplete(newOtp.join(""))
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <div className="flex justify-between gap-2 sm:gap-4">
      {otp.map((data, index) => (
        <motion.input
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          type="text"
          maxLength="6" // allow pasting long strings
          ref={el => inputRefs.current[index] = el}
          value={data}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold font-mono bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground"
        />
      ))}
    </div>
  )
}
