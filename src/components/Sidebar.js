import Image from "next/image"
import useKiosko from "@/hooks/useKiosko"
import Categoria from "./Categoria";

const Sidebar = () => {

    const { categorias } = useKiosko();

    return (
        <>
            <Image width={300} height={100} src={'/assets/img/logo.svg'}
                alt="Imagen Logotipo"
                className=""
            />
            <nav className="mt-10">
                {categorias.map(categoria =>(
                    <Categoria key={categoria.id} categoria={categoria} />
                ))}
            </nav>
        </>
    )
}

export default Sidebar