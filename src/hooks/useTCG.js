import { useEffect, useState } from 'react'

const API_URL = '/api-tcg/v2/cards'
const API_KEY = '88ec01b7-f5ee-4f63-839f-150d024ed9f0'

export function useTCG({ id, nombre, tipo, rareza, coleccion, skip = false }) {
  const [cartas, setCartas] = useState([])
  const [loading, setLoading] = useState(!skip)

  useEffect(() => {
    if (skip) return

    const controller = new AbortController()

    async function fetchCartas() {
      setLoading(true)
      try {
        // Construimos clave única para cachear todas las combinaciones
        const cacheKey = `cartas-${JSON.stringify({ id, nombre, tipo, rareza, coleccion })}`
        
        // Intentamos leer del cache
        const cache = localStorage.getItem(cacheKey)
        
        //Esto va a hacer que cartas[0] funcione tanto en ProductCard como en la vista de detalle.
    if (cache) {
  const parsed = JSON.parse(cache)
  const cartasData = Array.isArray(parsed) ? parsed : [parsed]
  setCartas(cartasData)
  setLoading(false)

  
  return
}

        // Construimos filtros para query
        let filtros = []
        if (nombre) filtros.push(`name:"${nombre}"`)
        if (tipo) filtros.push(`supertype:${tipo}`)
        if (rareza) filtros.push(`rarity:"${rareza}"`)
        if (coleccion) filtros.push(`set.name:"${coleccion}"`)

        const query = filtros.length ? `?q=${encodeURIComponent(filtros.join(' AND '))}` : ''
        const url = id ? `${API_URL}/${id}` : `${API_URL}${query}`

        const res = await fetch(url, {
          headers: { 'X-Api-Key': API_KEY },
          signal: controller.signal,
        })

        if (!res.ok) {
          console.warn('❌ Carta no encontrada:', res.status)
          setCartas([])
          return
        }

        const data = await res.json()
        const cartasData = data?.data || []

        setCartas(cartasData)

        // Guardamos el resultado en cache localStorage para esta consulta
        localStorage.setItem(cacheKey, JSON.stringify(cartasData))
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('⚠️ Error al cargar cartas', err)
          setCartas([])
        }
        
      } finally {
        setLoading(false)
      }
    }

    fetchCartas()
    return () => controller.abort()
  }, [id, nombre, tipo, rareza, coleccion, skip])

  return { cartas, loading }
}
