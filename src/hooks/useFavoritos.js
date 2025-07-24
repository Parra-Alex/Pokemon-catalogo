import { useState, useEffect } from 'react'

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('favoritos')
    return guardados ? JSON.parse(guardados) : []
  })

  // Guardar favoritos cuando cambian
  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  // Agregar o quitar carta completa
  function toggleFavorito(carta) {
    setFavoritos((prev) => {
      const existe = prev.find((c) => c.id === carta.id)
      if (existe) {
        return prev.filter((c) => c.id !== carta.id)
      } else {
        return [...prev, carta] // guardás objeto entero
      }
    })
  }

  function esFavorito(id) {
    return favoritos.some((c) => c.id === id)
  }

  function borrarTodos() {
    setFavoritos([])
  }

  return { favoritos, toggleFavorito, esFavorito, borrarTodos }
}
