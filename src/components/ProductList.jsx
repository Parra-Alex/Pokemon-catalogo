import { useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ productos }) {
  const productosPorPagina = 15
  const [paginaActual, setPaginaActual] = useState(1)

  if (!productos || productos.length === 0) {
    return <p className="py-4 text-center">❌ No se encontraron cartas.</p>
  }

  const indexInicio = (paginaActual - 1) * productosPorPagina
  const indexFin = indexInicio + productosPorPagina
  const productosPaginados = productos.slice(indexInicio, indexFin)
  const totalPaginas = Math.ceil(productos.length / productosPorPagina)

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productosPaginados.map((carta) => (
          <ProductCard key={carta.id} producto={carta} paginaActual={paginaActual} />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              className={`px-3 py-1 border rounded ${
                paginaActual === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
