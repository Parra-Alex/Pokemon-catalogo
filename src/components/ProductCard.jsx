// src/components/ProductCard.jsx
import { useNavigate } from 'react-router-dom'
import placeholder from '../assets/fallback.jpg'


import { useTCG } from '../hooks/useTCG'
import { useFavoritos } from '../hooks/useFavoritos'

function ProductCard({ producto }) {
  const navigate = useNavigate()
  const { toggleFavorito, esFavorito } = useFavoritos()

  const necesitaFetch =
    !producto.images?.large || !producto.tcgplayer?.prices?.holofoil?.market

  const { cartas, loading } = useTCG({
    nombre: producto.name || producto.nombre,
    skip: !necesitaFetch,
  })

  //const data = necesitaFetch ? cartas[0] : producto
const data = necesitaFetch
  ? (cartas?.[0]?.images ? cartas[0] : null)
  : producto
if (!producto) {
  return (
    <div className="p-4 text-center border rounded shadow">
      <p className="text-sm text-red-500">❌ Error: Carta inválida</p>
    </div>
  )
}

if (loading) {
  return (
    <div className="p-4 text-center border rounded shadow">
      <p className="text-sm text-gray-500">🔄 Cargando...</p>
    </div>
  )
}

if (!data || !data.images?.large) {
  return (
    <div className="p-4 text-center border rounded shadow">
      <p className="text-sm text-red-500">❌ Carta incompleta o no encontrada</p>
    </div>
  )
}
console.log('🧩 Producto original:', producto)
console.log('🧩 Resultado de useTCG:', cartas[0])

  const nombre = data.name || data.nombre
  const imagen = data.images?.large || data.imagen || placeholder
  const precio = data.tcgplayer?.prices?.holofoil?.market || data.precio || 0
  const favorito = esFavorito(data.id)

  // 🔒 Siempre guardar con estructura compatible con FavoritosList
  const cartaFavorito = {
    id: data.id,
    nombre,
    imagen,
    precio,
  }

  return (
    <div className="relative p-4 border rounded shadow hover:shadow-lg">
      {/* 💖 Botón de favorito */}
      <button
        onClick={() => toggleFavorito(cartaFavorito)}
        className="absolute text-2xl top-2 right-2"
        title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {favorito ? '💖' : '🤍'}
      </button>

      {/* 📷 Imagen */}
      <img
        src={imagen}
        alt={nombre}
        className="object-contain w-full h-40 mb-2 rounded max-h-[470px]"
        onError={(e) => {
          e.currentTarget.src = placeholder
        }}
      />

      {/* 📝 Nombre y precio */}
      <h2 className="text-lg font-semibold">{nombre}</h2>
      <p className="font-bold text-green-700">
        {precio > 0 ? `$${precio}` : 'Fuera de Stock'}
      </p>

      {/* 🔎 Botón de detalle */}
      <button
        onClick={() => navigate(`/producto/${data.id}`)}
        className="px-4 py-1 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Ver más
      </button>
      
    </div>
  )
}

export default ProductCard
