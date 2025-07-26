import { useParams, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { useTCG } from '../hooks/useTCG'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { agregarProducto } = useCarrito()

  const { cartas, loading, placeholder } = useTCG({ id })
  const producto = cartas[0]

  if (loading) {
    return <p className="p-4">🔄 Cargando carta...</p>
  }

if (!producto) {
  return (
    <div className="p-4 text-center border rounded shadow">
      <p className="mb-4 text-sm text-red-500">❌ Error: Carta inválida o fuera de stock.</p>
      <a
        href="/"
        className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        ← Volver al catálogo
      </a>
    </div>
  )
}

  const marketPrice = producto.tcgplayer?.prices?.holofoil?.market || null

  return (
    <div className="max-w-xl p-4 mx-auto">
      <img
        src={producto.images?.large || placeholder}
        alt={producto.name || 'Carta'}
        className="object-contain w-full h-40 mb-2 rounded max-h-[470px]"
        onError={(e) => {
          e.currentTarget.src = placeholder
        }}
      />

      <button
        onClick={() => navigate('/')}
        className="px-4 py-1 mb-4 text-white bg-gray-600 rounded hover:bg-gray-700"
      >
        ← Volver al catálogo
      </button>

      <h1 className="text-2xl font-bold">{producto.name}</h1>

      <p className="mb-2 text-gray-700">
        {producto.flavorText || producto.descripcion || 'Sin descripción disponible.'}
      </p>

      <div className="mb-2 text-sm text-gray-600">
        <p><strong>HP:</strong> {producto.hp || 'N/A'}</p>
        <p><strong>Artista:</strong> {producto.artist || 'Desconocido'}</p>
        <p><strong>Subtipos:</strong> {producto.subtypes?.join(', ') || 'N/A'}</p>
      </div>

      <p className="mb-4 text-xl font-bold text-green-700">
        {marketPrice ? `$${marketPrice.toFixed(2)}` : '$ :( Fuera de stock'}
      </p>

      <button
        onClick={() => agregarProducto(producto)}
        disabled={!marketPrice}
        className={`px-4 py-2 rounded text-white font-semibold ${
          marketPrice
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {marketPrice ? 'Agregar al carrito' : 'No disponible'}
      </button>

      {!marketPrice && (
        <p className="mt-2 text-sm text-red-500">
          Esta carta no está disponible para la venta.
        </p>
      )}
    </div>
  )
}

export default ProductDetail
