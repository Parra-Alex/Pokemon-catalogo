import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Carrito from './pages/Carrito'
import Favoritos from './pages/Favoritos'

function App() {
  return (
    <BrowserRouter>
      {/*  Router envuelve todo */}
      <Navbar /> {/*  Ahora está dentro del Router y puede usar <Link> sin romper */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
