function SearchBar({ busqueda, setBusqueda }) {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre...(Al usar: Tipo,Rareza, Coleccion.. Usa un nombre )"
      className="w-full p-2 mb-4 border rounded"
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  )
}

export default SearchBar
