// src/tools/ActualizarCartas.jsx (temporal )
import { useEffect } from 'react'
import products from '../data/products.json'
import { obtenerDatosCarta } from '../hooks/useTCG'

function ActualizarCartas() {
  useEffect(() => {
    async function procesar() {
      const nuevasCartas = []

      for (const carta of products) {
        const { rareza, coleccion } = await obtenerDatosCarta(carta.id)
        nuevasCartas.push({ ...carta, rareza, coleccion })
      }

     
      console.log(JSON.stringify(nuevasCartas, null, 2))
    }

    procesar()
  }, [])

  return <p>Procesando cartas... mirá la consola</p>
}

export default ActualizarCartas
