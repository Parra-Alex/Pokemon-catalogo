import { useState, useEffect, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import ProductList from '../components/ProductList'
import { useTCG } from '../hooks/useTCG'

function Home() {
  const [busqueda, setBusqueda] = useState(() => localStorage.getItem('busqueda') || '')
  const [filtroTipo, setFiltroTipo] = useState(() => localStorage.getItem('filtroTipo') || '')
  const [filtroRareza, setFiltroRareza] = useState(() => localStorage.getItem('filtroRareza') || '')
  const [filtroColeccion, setFiltroColeccion] = useState(() => localStorage.getItem('filtroColeccion') || '')

  useEffect(() => localStorage.setItem('busqueda', busqueda), [busqueda])
  useEffect(() => localStorage.setItem('filtroTipo', filtroTipo), [filtroTipo])
  useEffect(() => localStorage.setItem('filtroRareza', filtroRareza), [filtroRareza])
  useEffect(() => localStorage.setItem('filtroColeccion', filtroColeccion), [filtroColeccion])

  // Hook dinámico con filtros
  const { cartas: productosFiltrados, loading } = useTCG({
    nombre: busqueda,
    tipo: filtroTipo,
    rareza: filtroRareza,
    coleccion: filtroColeccion,
  })

  const productosPorPagina = 15
  const paginaActual = 1

  const productosPaginados = useMemo(() => {
    const indexInicio = (paginaActual - 1) * productosPorPagina
    const indexFin = indexInicio + productosPorPagina
    return productosFiltrados.slice(indexInicio, indexFin)
  }, [productosFiltrados, paginaActual])

  if (loading) {
    return <p className="py-4 text-lg text-center">🔄 Cargando cartas desde la API...</p>
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Catálogo Pokémon</h1>

      <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />

      <FilterPanel
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
        filtroRareza={filtroRareza}
        setRareza={setFiltroRareza}
        filtroColeccion={filtroColeccion}
        setColeccion={setFiltroColeccion}
      />

      <ProductList productos={productosPaginados} />
    </div>
  )
}

export default Home
