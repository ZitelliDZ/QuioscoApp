import Layout from "@/layout/Layout"
import useKiosko from "@/hooks/useKiosko"
import ResumenPedido from "@/components/ResumenPedido"


export default function Resumen() {

  const { pedidos } = useKiosko()

  
  return (
    <>
      <Layout pagina={`Resumen`}>
        <h1 className='text-4xl font-black '>
          Resumen
        </h1>
        <p className="text-2xl my-10"> Revisa tu Pedido</p>

        {pedidos?.length === 0 ? (
          <p className="text-center text-2xl"> No hay elementos en tu pedido.</p>
        ) : (
          pedidos.map(pedido => (
            <ResumenPedido
              pedido={pedido}
              key={pedido.id}
            />
          ))
        )}
      {pedidos?.lenght}
      </Layout>
    </>
  )
}
