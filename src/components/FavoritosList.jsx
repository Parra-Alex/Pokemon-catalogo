// src/components/FavoritosList.jsx
import { useFavoritos } from '../hooks/useFavoritos'
import { useNavigate } from 'react-router-dom'
import placeholder from '../assets/fallback.jpg'

function FavoritosList() {
  const { favoritos } = useFavoritos()
  const navigate = useNavigate()

  if (favoritos.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-500">😕 No tenés cartas en favoritos.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          ← Volver
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {favoritos.map((carta) => {
        const nombre = carta.name || carta.nombre || 'Sin nombre'
        const imagen = carta.imagen || placeholder
        const precio = carta.precio

        return (
          <div key={carta.id} className="p-3 border rounded shadow">
            <img
              src={imagen}
              alt={nombre}
              className="object-contain w-full h-48 mb-2 rounded max-h-[470px]"
              onError={(e) => {
                e.currentTarget.src = placeholder
              }}
            />
            <h2 className="font-semibold text-md">{nombre}</h2>
            <p className="mb-1 text-sm text-gray-600">
              ID: {carta.id || 'Desconocido'}
            </p>
            <p className="font-bold text-green-700">
              {precio > 0 ? `$${precio}` : '$ :( Fuera de Stock'}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default FavoritosList
