import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, Menu, X, Sun, Moon, User, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "./ThemeProvider"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { products } from "../data/products"
import { useLenis } from 'lenis/react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef(null)
  const navigate = useNavigate()
  
  const { theme, setTheme } = useTheme()
  const { itemCount, setIsCartOpen } = useCart()
  const { user, logout } = useAuth()
  const lenis = useLenis()

  const handleNavClick = (e, targetHash) => {
    // If we're on the home page and clicking a hash link
    if (window.location.pathname === "/" && targetHash.startsWith("#")) {
      e.preventDefault()
      if (lenis) {
        lenis.scrollTo(targetHash, { offset: -100 })
        window.history.pushState(null, '', targetHash)
      }
    }
  }

  const searchResults = searchQuery 
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const navLinks = ["Home", "Collection", "Story", "Reviews", "Contact"]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-background/70 backdrop-blur-xl border-border/50 py-4 shadow-sm"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="premium-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-heading font-bold tracking-tight text-primary z-50">
          Aura Spices.
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const targetPath = link === "Home" ? "/" : `/#${link.toLowerCase()}`
            return (
              <Link
                key={link}
                to={targetPath}
                onClick={(e) => handleNavClick(e, targetPath.replace("/", ""))}
                className="text-foreground/80 hover:text-primary transition-colors text-sm font-semibold tracking-wide relative group py-2"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-8 z-50">
          
          {/* Search */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 250, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden mr-2"
                >
                  <div className="relative flex items-center">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search spices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-surface text-foreground text-sm rounded-full py-2 pl-4 pr-8 border border-border focus:border-primary outline-none transition-colors"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 text-muted-foreground hover:text-foreground"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-foreground hover:text-primary hover:bg-surface rounded-full transition-all"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>

            {/* Desktop Search Results Dropdown */}
            <AnimatePresence>
              {isSearchOpen && searchQuery && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-10 mt-2 w-72 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {searchResults.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchQuery("")
                        navigate(`/product/${p.slug}`)
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-surface cursor-pointer border-b border-border/50 last:border-0"
                    >
                      <img src={p.images ? p.images[0] : p.image} alt={p.title} className="w-10 h-10 rounded-md object-cover" />
                      <div>
                        <p className="font-bold text-sm text-foreground line-clamp-1">{p.title}</p>
                        <p className="text-xs text-muted-foreground">₹{p.price}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-foreground hover:text-primary hover:bg-surface rounded-full transition-all relative"
          >
            <ShoppingBag size={20} strokeWidth={2.5} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-destructive text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-semibold hidden lg:block">{user.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100 z-50">
                <div className="p-2 space-y-1">
                  <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-surface hover:text-primary rounded-lg transition-colors font-medium">
                    <User size={16} />
                    Profile
                  </Link>
                  <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors font-medium">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/auth/login" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">Login</Link>
              <Link to="/auth/signup" className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-md shadow-primary/20">
                Sign Up
              </Link>
            </div>
          )}
          
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-foreground hover:text-primary hover:bg-surface rounded-full transition-all"
          >
            {theme === "dark" ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Mobile Menu & Theme Button */}
        <div className="md:hidden flex items-center space-x-2 z-50">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-foreground hover:text-primary transition-colors"
          >
            <Search size={20} />
          </button>
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-foreground hover:text-primary transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-lg md:hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-6">
              {navLinks.map((link) => {
                const targetPath = link === "Home" ? "/" : `/#${link.toLowerCase()}`
                return (
                  <Link
                    key={link}
                    to={targetPath}
                    className="text-foreground hover:text-primary text-xl font-heading font-semibold transition-colors"
                    onClick={(e) => {
                      handleNavClick(e, targetPath.replace("/", ""))
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {link}
                  </Link>
                )
              })}
              
              <div className="border-t border-border pt-6 pb-2">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-border" />
                      <div>
                        <p className="font-bold text-foreground text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left py-3 px-2 text-xl font-heading font-bold text-foreground hover:text-primary transition-colors">
                      My Profile
                    </Link>
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 px-2 text-xl font-heading font-bold text-red-500 hover:text-red-400 transition-colors">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-4 text-center border border-border rounded-xl font-bold text-foreground hover:bg-surface">
                      Login
                    </Link>
                    <Link to="/auth/signup" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-4 text-center bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border shadow-md md:hidden p-4"
          >
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface text-foreground rounded-xl py-3 pl-10 pr-10 border border-border focus:border-primary outline-none transition-colors"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>
            {/* Mobile Search Results */}
            {searchQuery && searchResults.length > 0 && (
              <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto">
                {searchResults.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery("")
                      navigate(`/product/${p.slug}`)
                    }}
                    className="flex items-center gap-3 p-3 bg-surface rounded-xl cursor-pointer"
                  >
                    <img src={p.images ? p.images[0] : p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-foreground">{p.title}</p>
                      <p className="text-sm text-muted-foreground">₹{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
