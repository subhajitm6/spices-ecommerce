import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("spices-user")
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      localStorage.setItem("spices-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("spices-user")
    }
  }, [user])

  const login = async (email, password) => {
    setLoading(true)
    // Simulate API delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setLoading(false)
        if (email && password) {
          const mockUser = {
            id: "u_12345",
            name: email.split("@")[0],
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`
          }
          setUser(mockUser)
          resolve(mockUser)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1500)
    })
  }

  const signup = async (data) => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false)
        const mockUser = {
          id: `u_${Math.floor(Math.random() * 100000)}`,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.firstName}`
        }
        setUser(mockUser)
        resolve(mockUser)
      }, 1500)
    })
  }

  const logout = () => {
    setUser(null)
    navigate("/auth/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
