import Head from "next/head"
import Sidebar from "@/components/Sidebar"
import Modal from "react-modal"
import useKiosko from "@/hooks/useKiosko";
import ModalProducto from "@/components/ModalProducto";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pasos from "@/components/Pasos";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

export default function Layout({ children, pagina }) {

  const { modal } = useKiosko()

  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Kiosko Cafetería" />
      </Head>
      <section className="md:flex">
        <aside className="md:w-4/12 xl:w-1/5 2xl:w-1/6">
          <Sidebar />
        </aside>
        <main className="md:w-8/12 xl:w-4/5 2xl:w-5/6 h-screen overflow-y-scroll">
          <div className="p-10">
            <Pasos />
            {children}
          </div>
        </main>
      </section>
      {modal && (<Modal
        isOpen={modal}
        style={customStyles}
      >
        <ModalProducto />
      </Modal>)}

        <div className="impo"></div>
      <ToastContainer theme="dark"
        position="bottom-right"
      />
    </>
  )
}
