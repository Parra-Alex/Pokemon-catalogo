import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ productos = [] }) {
  const productosPorPagina = 15
  const [paginaActual, setPaginaActual] = useState(1)

  // Si el array productos cambia, resetear página a 1 para evitar páginas inválidas
  useEffect(() => {
    setPaginaActual(1)
  }, [productos])

  // Si no hay productos, mostramos mensaje
  if (productos.length === 0) {
    return <p className="py-4 text-center">❌ No se encontraron cartas.</p>
  }

  // Índices para slice según página actual y productos por página
  const indexInicio = (paginaActual - 1) * productosPorPagina
  const indexFin = indexInicio + productosPorPagina
  // Slice de productos para la página actual
  const productosPaginados = productos.slice(indexInicio, indexFin)
  // Total de páginas redondeado hacia arriba
  const totalPaginas = Math.ceil(productos.length / productosPorPagina)

  return (
    <div>
{productos.length > productosPorPagina && (
  <p className="mb-2 text-sm text-center text-gray-600">
    Mostrando cartas {indexInicio + 1} a {Math.min(indexFin, productos.length)} de {productos.length}
  </p>
)}


      {/* Grid con cartas paginadas */}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productosPaginados.map((carta) => (
          <ProductCard key={carta.id} producto={carta} paginaActual={paginaActual} />
        ))}
      </div>

      {/* Solo mostramos botones si hay más de 1 página */}
      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {/* Botón anterior: no baja de página 1 */}
          <button
            onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
            disabled={paginaActual === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ← Anterior
          </button>

          {/* Botones con números de página */}
          {Array.from({ length: totalPaginas }, (_, i) => (
          <button
  key={i}
  onClick={() => setPaginaActual(i + 1)}
  aria-current={paginaActual === i + 1 ? 'page' : undefined}
  className={`px-3 py-1 border rounded ${
    paginaActual === i + 1
      ? 'bg-blue-600 text-white font-bold'
      : 'bg-white text-gray-800'
  }`}
>
  {i + 1}
</button>

          ))}

          {/* Botón siguiente: no pasa la última página */}
          <button
            onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}
