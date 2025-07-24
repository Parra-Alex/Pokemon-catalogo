import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Navbar() {
  const { carrito } = useCarrito()
  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <nav className="flex items-center justify-between p-4 mb-4 bg-gray-100 shadow">
      <div className="text-xl font-bold text-blue-700">Pokémon Catálogo</div>
      <div className="space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
        <Link to="/favoritos" className="text-pink-600 hover:underline">💖 Favoritos</Link>
        <Link to="/carrito" className="text-blue-600 hover:underline">
            🛒 Carrito ({cantidad})
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
