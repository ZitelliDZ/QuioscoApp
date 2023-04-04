import Layout from "@/layout/Layout"
import { useEffect, useCallback } from "react"
import useKiosko from "@/hooks/useKiosko"
import { formatearDinero } from "@/helpers"

export default function Total() {

  const { pedidos, nombre, setNombre, colocarOrden, total } = useKiosko()

  const comprobarPedido = useCallback(() => {
    return (pedidos.length === 0 || nombre==='' || nombre.length< 3)
  }, [pedidos,nombre])

  useEffect(() => {
    comprobarPedido()

  }, [pedidos, comprobarPedido])


  return (
    <>
      <Layout pagina={`Total`}>
        <h1 className='text-4xl font-black '>
          Total y Confirmar Pedido
        </h1>

        <p className="text-2xl my-10"> Confirma tu pedido a continuación. </p>

        <form onSubmit={colocarOrden}>
          <div>
            <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Nombre:</label>
            <input id="nombre" type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}
              className="bg-gray-100 w-full lg:w-1/3 rounded-md mt-3 p-2 border-4 border-slate-800"
            />
          </div>
          <div className="mt-10">
            <p className="text-2xl">Total a pagar {''} <span className="font-bold">{formatearDinero(total)}</span></p>

          </div>
          <div className="mt-10">
            <input className={`${!comprobarPedido() ? 'bg-indigo-600  hover:bg-indigo-900' : 'bg-indigo-400'} w-full lg:w-auto  px-5 py-2 rounded-lg text-center uppercase font-bold text-white`}
              value='confirmar pedido'
              type="submit"
              disabled={comprobarPedido()}
            />
          </div>
        </form>
      </Layout>
    </>
  )
}
