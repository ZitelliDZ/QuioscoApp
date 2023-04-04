import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const KioskoContext = createContext()

const KioskoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }
    const handleChangeModal = () => {
        setModal(!modal)
    }
    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        if (pedidos.some(productoState => productoState.id === producto.id)) {

            const pedidosActualizados = pedidos.map(productoState => productoState.id === producto.id ? producto : productoState)

            setPedidos(pedidosActualizados)
            toast.success('Modificado con éxito!')
        } else {
            setPedidos([...pedidos, producto])
            toast.success('Agregado al pedido!')
        }
        setModal(false)

    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedidos.filter(producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarCantidades = id => {
        const pedidoActualizado = pedidos.filter(producto => producto.id !== id)
        setPedidos(pedidoActualizado)
    }


    useEffect(() => {
        const nuevoTotal = pedidos.reduce((total, pedido) => (pedido.precio * pedido.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedidos])


    const colocarOrden = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/ordenes', {
                pedido: pedidos,
                nombre,
                total,
                fecha: Date.now().toString()
            })
            //Resetear App
            setPedidos([])
            setCategoriaActual(categorias[0])
            setNombre('')
            setTotal(0)
            toast.success('Pedido realizado con éxito!')
            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <KioskoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleSetProducto,
                modal,
                handleChangeModal,
                producto,
                handleAgregarPedido,
                pedidos,
                handleEditarCantidades,
                handleEliminarCantidades,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </KioskoContext.Provider>
    )
}

export {
    KioskoProvider
}

export default KioskoContext