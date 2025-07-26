import { useEffect, useState } from 'react'

const API_URL = '/api-tcg/v2/cards'
const API_KEY = '49c6e4e9-9019-40e4-a38e-bb62b50197aa'
const MAX_CACHE_ITEMS = 15

export function useTCG({ id, nombre, tipo, rareza, coleccion, page, pageSize, skip = false }) {
  const [cartas, setCartas] = useState([])
  const [loading, setLoading] = useState(!skip)

  useEffect(() => {
    if (skip) return

    const controller = new AbortController()

    // Crear una clave única para el cache según los filtros
    const cacheKey = `cartas-${JSON.stringify({ id, nombre, tipo, rareza, coleccion, page, pageSize })}`

    async function fetchCartas() {
      setLoading(true)
      try {
        // 1. Leer cache si existe
        const cachedRaw = localStorage.getItem(cacheKey)
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw)
          if (Array.isArray(cached.data)) {
            setCartas(cached.data)
            setLoading(false)
            return
          }
        }

        // 2. Construir filtros
        let filtros = []
        if (nombre) filtros.push(`name:"${nombre}"`)
        if (tipo) filtros.push(`supertype:${tipo}`)
        if (rareza) filtros.push(`rarity:"${rareza}"`)
        if (coleccion) filtros.push(`set.name:"${coleccion}"`)

        let queryParams = []
        if (filtros.length) queryParams.push(`q=${encodeURIComponent(filtros.join(' AND '))}`)
        
        // ✅ Solo incluir page y pageSize si se pasaron explícitamente
        if (page && pageSize) {
          queryParams.push(`page=${page}`, `pageSize=${pageSize}`)
        }

        const queryString = queryParams.length ? `?${queryParams.join('&')}` : ''
        const url = id ? `${API_URL}/${id}` : `${API_URL}${queryString}`

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

        // 3. Limpiar cache si excede límite
        const keys = Object.keys(localStorage).filter(k => k.startsWith('cartas-'))
        if (keys.length >= MAX_CACHE_ITEMS) {
          const sorted = keys
            .map(k => ({ key: k, time: JSON.parse(localStorage.getItem(k))?.timestamp || 0 }))
            .sort((a, b) => a.time - b.time)
          localStorage.removeItem(sorted[0].key)
        }

        // 4. Guardar en cache con timestamp
        const toStore = { data: cartasData, timestamp: Date.now() }
        localStorage.setItem(cacheKey, JSON.stringify(toStore))

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
  }, [id, nombre, tipo, rareza, coleccion, page, pageSize, skip])

  return { cartas, loading }
}
