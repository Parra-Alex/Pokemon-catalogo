import { createContext, useContext } from 'react'
import { useCart } from '../hooks/useCart'

// Crea el contexto
const CarritoContext = createContext()

// Proveedor del contexto
export function CarritoProvider({ children }) {
  const value = useCart()
  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}

// Hook personalizado para consumir el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useCarrito = () => useContext(CarritoContext)


