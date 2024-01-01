'use client'
import CompoInicioTr from "@/components/usuarioFinal/InicioTr"
import '@/hojas-de-estilo/usuario-final/InicioTr.css';
import { useEffect, useState } from "react";

export default function Home({ DashboardPage,pageProps}) {
  const [indice, setIndice] = useState(0);
  let texto = " ¡Gracias por visitar el repositorio CUNOR, ID Y ENSEÑAD A TODOS! "

  useEffect(()=>{
    const intervalId = setInterval(
      ()=>{
        setIndice(indice=>(indice+1)%texto.length)
      },250
    );

    return ()=> clearInterval(intervalId);
  },[])

  const textoMover = texto.slice(indice) + texto.slice(0, indice);

  
  

  return (

    <>
      <div className="contenedor-principal d-flex justify-content-center align-items-center">
        <div className="card  text-white mb-3" style={{maxWidth: "90%", background:"#ffffff"}}>
          <div className="card-body">
            {/* <h5 className="titulo-tarjeta"><i className="bi bi-book-half"></i>USAC-CUNOR<i className="bi bi-book-half"></i></h5> */}
            <img className="mb-3 img-fluid" src={'/images/cunorl-logo3.jpg'}  style={{width:'800px', height:'300px'}}/>
            <div className="parrafo-tarjeta">
              <p className="card-text">{textoMover}</p>
            </div>
          </div>
        </div>
      </div>
       


            <CompoInicioTr />
      

    </>
  
  )
}
