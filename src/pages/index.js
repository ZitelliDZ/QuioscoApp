
import Layout from '@/layout/Layout'
import useKiosko from '@/hooks/useKiosko'
import Producto from '@/components/Producto'



export default function Home() {

  const { categoriaActual } = useKiosko()

  return (
    <>
      <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
        <h1 className='text-4xl font-black '>
          Inicio
        </h1>
        <p className='text-2xl my-10'>Elige y Personaliza tu pedido.</p>
        <div className='grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {categoriaActual?.productos?.map(producto => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>

      </Layout>
    </>
  )
}

