//Carrito.jsx → muestra contenido actual del carrito.
import { useCarrito } from '../context/CarritoContext'

function Carrito() {
  const { carrito, quitarProducto, vaciarCarrito } = useCarrito()

  const total = carrito.reduce((acc, item) => {
    const precio = item.precio || item?.tcgplayer?.prices?.holofoil?.market || 0
    return acc + precio * item.cantidad
  }, 0)

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Tu carrito</h1>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <img
                  src={item?.images?.large || item?.imagen || '/assets/fallback.jpg'}
                  alt={item.nombre}
                  className="object-contain w-16 h-16 mr-4 bg-white rounded max-h-[100px]"
                />
                <div>
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                  <p className="text-sm text-gray-600">
                    Precio: ${item.precio || item?.tcgplayer?.prices?.holofoil?.market || 0}
                  </p>
                  
                </div>
              </div>

              <button onClick={() => quitarProducto(item.id)} className="text-red-500">
                Quitar
              </button>
            </div>
          ))}

          <p className="mt-4 font-bold">Total: ${total}</p>

          <button onClick={vaciarCarrito} className="px-4 py-2 mt-2 text-white bg-red-600 rounded">
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  )
}

export default Carrito
