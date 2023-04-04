import Image from "next/image"
import { formatearDinero } from "../helpers"
import useKiosko from "../hooks/useKiosko"

const Producto = ({ producto }) => {

    const { handleSetProducto, handleChangeModal } = useKiosko()


    const { nombre, id, imagen, precio } = producto

    return (
        <div className="border p-3">
            <Image src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen Platillo ${nombre}`}
                width={400}
                height={500}
            />
            <div className="p-5 ">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>
            </div>

            <button type="button" className=" bg-indigo-400 hover:bg-indigo-800 text-white uppercase w-full mt-5 py-5 px-3 font-bold rounded-md"
                onClick={() => {
                    handleSetProducto(producto)
                    handleChangeModal()

                }}
            >
                Agregar Producto
            </button>
        </div>
    )
}

export default Producto