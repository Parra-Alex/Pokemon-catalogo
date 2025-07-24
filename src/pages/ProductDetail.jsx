import { useParams, useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { useTCG } from '../hooks/useTCG'

function ProductDetail() {
  const { id } = useParams() // Obtenemos el ID desde la URL
  const navigate = useNavigate() // Para poder volver a la Home
  const { agregarProducto } = useCarrito()

  //  IMPORTANTE: Buscamos carta desde la API SOLO en el detalle
  // Esto usa `useTCG({ id })` que busca por ID (seguro, sin errores de nombre)
  const { cartas, loading,placeholder } = useTCG({ id })

  //  Normalizamos la respuesta (la API devuelve 1 sola carta con ID)
  const producto = cartas[0]

  //  Si no hay producto (y tampoco está cargando), mostramos error

if (loading) {
  return <p className="p-4">🔄 Cargando carta...</p>
}

if (!producto) {
  return (
    <div className="p-4 text-center border rounded shadow">
      <p className="text-sm text-red-500">❌ Error: Carta inválida o Fuera de Stock </p>
    </div>
  )
}


  return (
    <div className="max-w-xl p-4 mx-auto">
      {loading ? (
        //  Mostramos loader mientras la API responde
        <p>Cargando...</p>
      ) : (
        <>
      
<img
  src={producto.images?.large || placeholder}
  alt={producto.name || 'Carta'}
  className="object-contain w-full h-40 mb-2 rounded max-h-[470px]"
  onError={(e) => {
    e.currentTarget.src = placeholder
  }}
/>

          {/*  Botón para volver a la pantalla principal */}
          
          <button
            onClick={() => navigate('/')}
            className="px-4 py-1 mb-4 text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            ← Volver al catálogo
          </button>

          {/*  Detalle del producto */}
          <h1 className="text-2xl font-bold">{producto.name}</h1>

          <p className="mb-2 text-gray-700">
            {producto.flavorText || producto.descripcion || 'Sin descripción disponible.'}
          </p>

          {/* Información extra (si existe) */}
          <div className="mb-2 text-sm text-gray-600">
            <p><strong>Rareza:</strong> {producto.rarity || 'Desconocida'}</p>
            <p><strong>Colección:</strong> {producto.set?.name || 'N/A'}</p>
            <p><strong>Tipo:</strong> {producto.types?.join(', ') || 'N/A'}</p>
          </div>


{/* Precio desde la API o mensaje si no hay */}
<p className="mb-4 text-xl font-bold text-green-700">
  {producto.tcgplayer?.prices?.holofoil?.market
    ? `$${producto.tcgplayer.prices.holofoil.market.toFixed(2)}`
    : '$  :(  Fuera de Stock'}
</p>

{/* Botón agregar al carrito, solo si hay precio */}
<button
  onClick={() => agregarProducto(producto)}
  disabled={!producto.tcgplayer?.prices?.holofoil?.market}
  className={`px-4 py-2 rounded text-white font-semibold ${
    producto.tcgplayer?.prices?.holofoil?.market
      ? 'bg-blue-600 hover:bg-blue-700'
      : 'bg-gray-400 cursor-not-allowed'
  }`}
>
  {producto.tcgplayer?.prices?.holofoil?.market
    ? 'Agregar al carrito'
    : 'No disponible'}
</button>
{!producto.tcgplayer?.prices?.holofoil?.market && (
  <p className="mt-2 text-sm text-red-500">
    Esta carta no está disponible para la venta.
  </p>
)}

          
        </>
      )}
    </div>
  )
}

export default ProductDetail
