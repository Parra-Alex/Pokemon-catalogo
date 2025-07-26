import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import ProductList from '../components/ProductList'
import { useTCG } from '../hooks/useTCG'

function Home() {
  // Estados para búsqueda y filtros, con persistencia
  const [busqueda, setBusqueda] = useState(() => localStorage.getItem('busqueda') || '')
  const [filtroTipo, setFiltroTipo] = useState(() => localStorage.getItem('filtroTipo') || '')
  const [filtroRareza, setFiltroRareza] = useState(() => localStorage.getItem('filtroRareza') || '')
  const [filtroColeccion, setFiltroColeccion] = useState(() => localStorage.getItem('filtroColeccion') || '')

  // Guardar en localStorage para persistencia
  useEffect(() => localStorage.setItem('busqueda', busqueda), [busqueda])
  useEffect(() => localStorage.setItem('filtroTipo', filtroTipo), [filtroTipo])
  useEffect(() => localStorage.setItem('filtroRareza', filtroRareza), [filtroRareza])
  useEffect(() => localStorage.setItem('filtroColeccion', filtroColeccion), [filtroColeccion])

  // 🔌 Llamada al hook sin paginación (trae todas las cartas que matchean)
  const { cartas: productosFiltrados, loading } = useTCG({
    nombre: busqueda,
    tipo: filtroTipo,
    rareza: filtroRareza,
    coleccion: filtroColeccion,
  })

  if (loading) {
    return <p className="py-4 text-lg text-center">🔄 Cargando cartas desde la API...</p>
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Catálogo Pokémon</h1>

      {/* Buscador */}
      <SearchBar busqueda={busqueda} setBusqueda={setBusqueda} />

      {/* Filtros */}
      <FilterPanel
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
        filtroRareza={filtroRareza}
        setRareza={setFiltroRareza}
        filtroColeccion={filtroColeccion}
        setColeccion={setFiltroColeccion}
      />

      {/* Lista paginada (maneja su propia lógica de paginación local) */}
      <ProductList productos={productosFiltrados} />
    </div>
  )
}

export default Home
