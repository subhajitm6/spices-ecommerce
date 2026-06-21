import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("spices-cart")
    return saved ? JSON.parse(saved) : []
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("spices-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1, weight = "100g") => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.weight === weight)
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id && item.weight === weight 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity, weight }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id, weight) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.weight === weight)))
  }

  const updateQuantity = (id, weight, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(prev => 
      prev.map(item => 
        item.id === id && item.weight === weight 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      cartTotal,
      itemCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
