import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function ProtectedRoute({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export function AuthRoute({ children }) {
  const { user } = useAuth()

  // If user is already logged in, they shouldn't see login/signup pages
  if (user) {
    return <Navigate to="/profile" replace />
  }

  return children
}
