import { useNavigate } from 'react-router-dom'
import { useFavoritos } from '../hooks/useFavoritos'
import FavoritosList from '../components/FavoritosList'

function Favoritos() {
  const navigate = useNavigate()
  const { favoritos, borrarTodos } = useFavoritos()

  if (favoritos.length === 0) {
    return (
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mb-4 text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Volver
        </button>
        <p>No tenés cartas en favoritos.</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-4 text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Volver
      </button>

      <h1 className="mb-4 text-2xl font-bold">💖 Tus favoritos</h1>

      <FavoritosList /> {/* ✅ Este renderiza las cartas favoritas */}

      <button
        onClick={borrarTodos}
        className="px-4 py-2 mt-6 text-white bg-red-500 rounded hover:bg-red-600"
      >
        🗑️ Borrar todos los favoritos
      </button>
    </div>
  )
}

export default Favoritos
