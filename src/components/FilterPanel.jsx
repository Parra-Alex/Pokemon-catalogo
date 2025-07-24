/*Vistas*/

function FilterPanel({
  filtroTipo,
  setFiltroTipo,
  filtroRareza,
  setRareza,
  filtroColeccion,
  setColeccion,
  mostrarTipo = true,
  mostrarRareza = true,
  mostrarColeccion = true
}) {
  const opcionesTipo = ['', 'cartas', 'kits', 'álbumes']

  const opcionesRareza = [
    '',
    'Common',
    'Uncommon',
    'Rare',
    'Rare Holo',
    'Rare Holo EX',
    'Rare Holo GX',
    'Rare Holo V',
    'Rare Holo VMAX',
    'Rare Ultra',
    'Rare Secret',
    'Rare Rainbow',
    'Ultra Rare',
    'Promo'
  ]

  const opcionesColeccion = [
    '',
    'Base',
    'Jungle',
    'Fossil',
    'Team Rocket',
    'Gym Heroes',
    'Neo Genesis',
    'EX Ruby & Sapphire',
    'Diamond & Pearl',
    'HeartGold & SoulSilver',
    'Black & White',
    'XY',
    'Sun & Moon',
    'Sword & Shield',
    'Scarlet & Violet'
  ]

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {mostrarTipo && (
        <div>
          <label className="mr-2 font-semibold">Tipo:</label>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="p-2 border rounded"
          >
            {opcionesTipo.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo === '' ? 'Todos' : tipo}
              </option>
            ))}
          </select>
        </div>
      )}

      {mostrarRareza && (
        <div>
          <label className="mr-2 font-semibold">Rareza:</label>
          <select
            value={filtroRareza}
            onChange={(e) => setRareza(e.target.value)}
            className="p-2 border rounded"
          >
            {opcionesRareza.map((rareza) => (
              <option key={rareza} value={rareza}>
                {rareza === '' ? 'Todas' : rareza}
              </option>
            ))}
          </select>
        </div>
      )}

      {mostrarColeccion && (
        <div>
          <label className="mr-2 font-semibold">Colección:</label>
          <select
            value={filtroColeccion}
            onChange={(e) => setColeccion(e.target.value)}
            className="p-2 border rounded"
          >
            {opcionesColeccion.map((coleccion) => (
              <option key={coleccion} value={coleccion}>
                {coleccion === '' ? 'Todas' : coleccion}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default FilterPanel
