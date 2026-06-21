import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useLenis } from 'lenis/react'
import SmoothScrollProvider from "./providers/SmoothScrollProvider"
import ScrollProgress from "./components/ScrollProgress"
import BackToTop from "./components/BackToTop"
import { ThemeProvider } from "./components/ThemeProvider"
import { CartProvider } from "./context/CartContext"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CartDrawer from "./components/CartDrawer"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Payment from "./pages/Payment"
import OrderSuccess from "./pages/OrderSuccess"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute, AuthRoute } from "./routes/ProtectedRoute"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import ForgotPassword from "./pages/auth/ForgotPassword"
import VerifyOTP from "./pages/auth/VerifyOTP"
import ResetPassword from "./pages/auth/ResetPassword"
import Profile from "./pages/Profile"

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(hash, { offset: -100 })
        } else {
          const element = document.getElementById(hash.replace("#", ""))
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }, 100)
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      }
    }
  }, [pathname, hash, lenis])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/auth/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/auth/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="/auth/forgot-password" element={<AuthRoute><ForgotPassword /></AuthRoute>} />
        <Route path="/auth/verify-otp" element={<AuthRoute><VerifyOTP /></AuthRoute>} />
        <Route path="/auth/reset-password" element={<AuthRoute><ResetPassword /></AuthRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  // Remove native smooth scroll behavior as we're using Lenis
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto"
  }, [])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SmoothScrollProvider>
        <CartProvider>
          <Router>
            <AuthProvider>
              <ScrollToTop />
              <ScrollProgress />
              <BackToTop />
              <div className="relative overflow-hidden selection:bg-primary/20 selection:text-primary">
                <Navbar />
                <CartDrawer />
                <main className="min-h-screen">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </Router>
        </CartProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  )
}

export default App
