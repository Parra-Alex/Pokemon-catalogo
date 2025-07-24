import { useState, useEffect } from 'react'

// Hook para manejar carrito con persistencia
export function useCart() {
  //Asegurate de que tu useCart.js lea el carrito al cargar la app:
const [carrito, setCarrito] = useState(() => {
  const saved = localStorage.getItem('carrito')
  return saved ? JSON.parse(saved) : []
})

  // Recuperar carrito del localStorage al montar
  useEffect(() => {
    const data = localStorage.getItem('carrito')
    if (data) setCarrito(JSON.parse(data))
  }, [])


  
  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const quitarProducto = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  const vaciarCarrito = () => setCarrito([])

  return { carrito, agregarProducto, quitarProducto, vaciarCarrito }
}
